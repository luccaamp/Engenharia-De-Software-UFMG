import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Estatisticas = () => {
    const [dadosGraficos, setDadosGraficos] = useState({ linhaSemestres: [] });
    const [loading, setLoading] = useState(true);
    const [ultimaAtualizacao, setUltimaAtualizacao] = useState(Date.now());
    const navigate = useNavigate();

    const NOTA_MINIMA_NSG = 50;
    const NOTA_MAXIMA = 100;

    const ordenarSemestres = (semestres) => {
        return semestres.sort((a, b) => {
            const [anoA, periodoA] = a.split('/');
            const [anoB, periodoB] = b.split('/');
            
            if (anoA !== anoB) return anoA - anoB;
            return periodoA - periodoB;
        });
    };

    const buscarDados = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem("email"));
            if (!userData?.email) {
                navigate('/login');
                return;
            }

            const response = await axios.get('http://localhost:8000/disciplinas', {
                params: { user_id: userData.email }
            });

            const disciplinas = response.data || [];

            const dadosPorSemestre = {};
            
            disciplinas.forEach(disc => {
                const semestre = disc.semestre || 'Sem semestre';
                if (semestre === 'Sem semestre') return;
                
                const notasValidas = (disc.notas || []).filter(nota => parseFloat(nota.valor) >= 0);
                const somaNotas = notasValidas.reduce((total, nota) => total + (parseFloat(nota.valor) || 0), 0);
                
                if (!dadosPorSemestre[semestre]) {
                    dadosPorSemestre[semestre] = {
                        somaTotal: 0,
                        count: 0
                    };
                }
                
                dadosPorSemestre[semestre].somaTotal += somaNotas;
                dadosPorSemestre[semestre].count++;
            });

            const semestresOrdenados = ordenarSemestres(Object.keys(dadosPorSemestre));
            
            const linhaSemestres = semestresOrdenados.map(semestre => ({
                semestre: semestre,
                media: parseFloat((dadosPorSemestre[semestre].somaTotal / dadosPorSemestre[semestre].count).toFixed(2))
            }));

            setDadosGraficos({ linhaSemestres });

        } catch (error) {
            console.error("Erro ao carregar dados:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        buscarDados();
        
        const intervalo = setInterval(() => {
            setUltimaAtualizacao(Date.now());
        }, 5000);

        return () => clearInterval(intervalo);
    }, [navigate, ultimaAtualizacao]);

    const handleRecarregar = () => {
        setLoading(true);
        setUltimaAtualizacao(Date.now());
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="p-4 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Nota Semestral Global (NSG)</h1>
                <button 
                    onClick={handleRecarregar}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-4 rounded-md transition-all"
                    >
                    Atualizar
                </button>
            </div>

            {/* Apenas a aba NSG */}
            <div className="mb-6">
                <nav className="flex space-x-4" aria-label="Tabs">
                    <button
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                    >
                        NSG
                    </button>
                </nav>
            </div>

            {/* Conteúdo da aba NSG */}
            <div className="bg-white rounded-lg shadow p-4">
                {dadosGraficos.linhaSemestres.length > 0 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">NSG (Nota Semestral Global)</h2>
                        <div style={{ height: '400px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={dadosGraficos.linhaSemestres}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis 
                                        dataKey="semestre" 
                                        angle={-45} 
                                        textAnchor="end" 
                                        height={70} 
                                    />
                                    <YAxis domain={[0, NOTA_MAXIMA]} />
                                    <Tooltip 
                                        formatter={(value) => [`NSG: ${value}`, '']}
                                        labelFormatter={(label) => `Semestre: ${label}`}
                                    />
                                    <Legend />
                                    <ReferenceLine 
                                        y={NOTA_MINIMA_NSG} 
                                        label={{ value: `Mínimo NSG: ${NOTA_MINIMA_NSG}`, position: 'insideTopRight' }} 
                                        stroke="red" 
                                        strokeDasharray="3 3" 
                                    />
                                    <Line 
                                        type="monotone" 
                                        dataKey="media" 
                                        name="NSG" 
                                        stroke="#8884d8" 
                                        strokeWidth={2}
                                        activeDot={{ r: 8 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Estatisticas;
