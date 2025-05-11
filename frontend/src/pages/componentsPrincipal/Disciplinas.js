import React, { useState } from 'react';

function Disciplinas() {
    const [disciplinas, setDisciplinas] = useState([]);
    const [disciplinaSelecionada, setDisciplinaSelecionada] = useState(null);
    const [mostrarModalDisciplina, setMostrarModalDisciplina] = useState(false);
    const [mostrarModalAtividade, setMostrarModalAtividade] = useState(false);

    // Inputs para nova disciplina
    const [novaDisciplinaNome, setNovaDisciplinaNome] = useState("");
    const [novaDisciplinaSemestre, setNovaDisciplinaSemestre] = useState("");

    // Inputs para nova atividade
    const [novaAtividadeNome, setNovaAtividadeNome] = useState("");
    const [novaAtividadeNota, setNovaAtividadeNota] = useState("");

    // States para edição
    const [modoEdicaoDisciplina, setModoEdicaoDisciplina] = useState(false);
    const [indiceDisciplinaEdicao, setIndiceDisciplinaEdicao] = useState(null);

    const [modoEdicaoAtividade, setModoEdicaoAtividade] = useState(false);
    const [indiceAtividadeEdicao, setIndiceAtividadeEdicao] = useState(null);

    const adicionarDisciplina = () => {
        if (!novaDisciplinaNome.trim()) return;

        setDisciplinas([
            ...disciplinas,
            {
                nome: novaDisciplinaNome,
                semestre: novaDisciplinaSemestre,
                atividades: [],
            },
        ]);

        setNovaDisciplinaNome("");
        setNovaDisciplinaSemestre("");
        setMostrarModalDisciplina(false);
    };

    const selecionarDisciplina = (index) => {
        setDisciplinaSelecionada(index);
        setMostrarModalAtividade(false);  // Fechar a guia de atividades ao voltar para a disciplina
    };

    const editarDisciplina = (index) => {
        const disc = disciplinas[index];
        setNovaDisciplinaNome(disc.nome);
        setNovaDisciplinaSemestre(disc.semestre);
        setIndiceDisciplinaEdicao(index);
        setModoEdicaoDisciplina(true);
        setMostrarModalDisciplina(true);
    };

    const salvarDisciplina = () => {
        if (!novaDisciplinaNome.trim()) return;

        const novaLista = [...disciplinas];
        if (modoEdicaoDisciplina && indiceDisciplinaEdicao !== null) {
            novaLista[indiceDisciplinaEdicao] = {
                ...novaLista[indiceDisciplinaEdicao],
                nome: novaDisciplinaNome,
                semestre: novaDisciplinaSemestre
            };
        } else {
            novaLista.push({
                nome: novaDisciplinaNome,
                semestre: novaDisciplinaSemestre,
                atividades: [],
            });
        }

        setDisciplinas(novaLista);
        setNovaDisciplinaNome("");
        setNovaDisciplinaSemestre("");
        setMostrarModalDisciplina(false);
        setModoEdicaoDisciplina(false);
        setIndiceDisciplinaEdicao(null);
    };

    const adicionarAtividade = () => {
        if (!novaAtividadeNome.trim()) return;

        const novaLista = [...disciplinas];
        novaLista[disciplinaSelecionada].atividades.push({
            nome: novaAtividadeNome,
            nota: Number(novaAtividadeNota),
        });

        setDisciplinas(novaLista);
        setNovaAtividadeNome("");
        setNovaAtividadeNota("");
        setMostrarModalAtividade(false);
    };

    const editarAtividade = (index) => {
        const atv = disciplinas[disciplinaSelecionada].atividades[index];
        setNovaAtividadeNome(atv.nome);
        setNovaAtividadeNota(atv.nota);
        setIndiceAtividadeEdicao(index);
        setModoEdicaoAtividade(true);
        setMostrarModalAtividade(true);
    };

    const salvarAtividade = () => {
        if (!novaAtividadeNome.trim()) return;

        const novaLista = [...disciplinas];
        const atividades = novaLista[disciplinaSelecionada].atividades;

        if (modoEdicaoAtividade && indiceAtividadeEdicao !== null) {
            atividades[indiceAtividadeEdicao] = {
                nome: novaAtividadeNome,
                nota: Number(novaAtividadeNota)
            };
        } else {
            atividades.push({
                nome: novaAtividadeNome,
                nota: Number(novaAtividadeNota),
            });
        }

        setDisciplinas(novaLista);
        setNovaAtividadeNome("");
        setNovaAtividadeNota("");
        setMostrarModalAtividade(false);
    };

    const removerAtividade = (atividadeIndex) => {
        const novaLista = [...disciplinas];
        novaLista[disciplinaSelecionada].atividades.splice(atividadeIndex, 1);
        setDisciplinas(novaLista);
    };

    const removerDisciplina = (index) => {
        const novaLista = [...disciplinas];
        novaLista.splice(index, 1);
        setDisciplinas(novaLista);
        if (disciplinaSelecionada === index) setDisciplinaSelecionada(null);
    };

    const totalNota = disciplinaSelecionada !== null
        ? disciplinas[disciplinaSelecionada].atividades.reduce((soma, atv) => soma + atv.nota, 0)
        : 0;

    return (
        <div className="relative flex flex-col h-full">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h3 className="font-medium text-gray-700">Minhas Disciplinas</h3>
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-all transform hover:scale-105"
                    onClick={() => setMostrarModalDisciplina(true)}
                >
                    <span className="material-symbols-outlined text-sm">add</span>
                </button>
            </div>

            {/* Lista de Disciplinas */}
            {disciplinaSelecionada === null ? (
                <div className="flex-1 overflow-auto p-2">
                    {disciplinas.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-[200px]">
                            <span className="material-symbols-outlined text-gray-400 text-4xl mb-2">menu_book</span>
                            <p className="text-gray-500 text-center">
                                Nenhuma disciplina cadastrada. Clique no botão + para adicionar.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {disciplinas.map((disc, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white p-3 rounded-md shadow-sm border hover:shadow-md transition-all cursor-pointer flex justify-between items-center"
                                >
                                    <div onClick={() => selecionarDisciplina(idx)} className="w-full">
                                        <h4 className="font-medium">{disc.nome}</h4>
                                        {disc.semestre && (
                                            <span className="text-xs bg-blue-100 text-blue-700 py-1 px-2 rounded-full">
                                                {disc.semestre}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            className="text-red-500 hover:text-red-700"
                                            onClick={() => removerDisciplina(idx)}
                                        >
                                            <span className="material-symbols-outlined">delete</span>
                                        </button>
                                        <button
                                            className="text-blue-600 hover:text-blue-700"
                                            onClick={() => editarDisciplina(idx)}
                                        >
                                            <span className="material-symbols-outlined">edit</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                // Painel de Atividades
                <div className="flex-1 flex flex-col">
                    <div className="p-3 border-b flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <button
                                className="text-gray-600 hover:text-gray-800"
                                onClick={() => setDisciplinaSelecionada(null)}
                            >
                                <span className="material-symbols-outlined">arrow_back</span>
                            </button>
                            <h3 className="font-medium text-gray-700">
                                {disciplinas[disciplinaSelecionada].nome}
                            </h3>
                        </div>
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
                            onClick={() => setMostrarModalAtividade(true)}
                        >
                            <span className="material-symbols-outlined text-sm">add</span>
                        </button>
                    </div>

                    <div className="flex-1 overflow-auto p-3 space-y-3">
                        {disciplinas[disciplinaSelecionada].atividades.map((atv, idx) => (
                            <div key={idx} className="bg-white p-3 rounded-md border">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h4 className="font-medium">{atv.nome}</h4>
                                        <span className="text-sm text-gray-600">{atv.nota}/100</span>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            className="text-red-500 hover:text-red-700"
                                            onClick={() => removerAtividade(idx)}
                                        >
                                            <span className="material-symbols-outlined">delete</span>
                                        </button>
                                        <button
                                            className="text-blue-600 hover:text-blue-700"
                                            onClick={() => editarAtividade(idx)}
                                        >
                                            <span className="material-symbols-outlined">edit</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-3 border-t bg-gray-50 flex justify-between">
                        <p className="font-medium text-gray-700">Total</p>
                        <p className="font-bold text-lg">{totalNota}/100</p>
                    </div>
                </div>
            )}

            {/* Modal Disciplina */}
            {mostrarModalDisciplina && (
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center z-10">
                    <div className="bg-white rounded-lg shadow-xl border w-[300px]">
                        <div className="p-4 border-b border-gray-200">
                            <h3 className="font-medium">{modoEdicaoDisciplina ? "Editar Disciplina" : "Adicionar Disciplina"}</h3>
                        </div>
                        <div className="p-4 space-y-4">
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Nome da Disciplina</label>
                                <input
                                    type="text"
                                    value={novaDisciplinaNome}
                                    onChange={(e) => setNovaDisciplinaNome(e.target.value)}
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Ex: Matemática"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Semestre (opcional)</label>
                                <input
                                    type="text"
                                    value={novaDisciplinaSemestre}
                                    onChange={(e) => setNovaDisciplinaSemestre(e.target.value)}
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Ex: 2024/1 ou 2º semestre"
                                />
                            </div>
                        </div>
                        <div className="p-4 border-t flex justify-end gap-2">
                            <button
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                                onClick={() => setMostrarModalDisciplina(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                                onClick={salvarDisciplina}
                            >
                                {modoEdicaoDisciplina ? "Atualizar" : "Salvar"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Atividade */}
            {mostrarModalAtividade && (
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center z-10">
                    <div className="bg-white rounded-lg shadow-xl border w-[300px]">
                        <div className="p-4 border-b">
                            <h3 className="font-medium">{modoEdicaoAtividade ? "Editar Atividade" : "Adicionar Atividade"}</h3>
                        </div>
                        <div className="p-4 space-y-4">
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Nome da Atividade</label>
                                <input
                                    type="text"
                                    value={novaAtividadeNome}
                                    onChange={(e) => setNovaAtividadeNome(e.target.value)}
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Ex: Prova Final"
                                    />
                                </div>
                            <div>
                        <label className="block text-sm text-gray-600 mb-1">Nota</label>
                            <input
                                type="number"
                                value={novaAtividadeNota}
                                onChange={(e) => setNovaAtividadeNota(e.target.value)}
                                className="w-full p-2 border rounded-md"
                                placeholder="Ex: 85"
                                />
                            </div>
                        </div>
                        <div className="p-4 border-t flex justify-end gap-2">
                            <button
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                                onClick={() => setMostrarModalAtividade(false)}
                                >
                                Cancelar
                            </button>
                            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md" onClick={salvarAtividade} >
                                {modoEdicaoAtividade ? "Atualizar" : "Salvar"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Disciplinas;
