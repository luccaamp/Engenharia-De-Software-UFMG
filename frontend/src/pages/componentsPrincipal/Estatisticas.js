import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

function Estatisticas() {
  const [dadosGrafico, setDadosGrafico] = useState([]);
  const [maiorMedia, setMaiorMedia] = useState(null);
  const [menorMedia, setMenorMedia] = useState(null);
  const [mediaGeral, setMediaGeral] = useState(null);

  const userId = localStorage.getItem("email");
  useEffect(() => {
    if (!userId) return;

    const ordenarDisciplinasPorSemestre = (disciplinas) => {
      return disciplinas.slice().sort((a, b) => {
        const [anoA, semA] = a.semestre.split('/').map(Number);
        const [anoB, semB] = b.semestre.split('/').map(Number);
        if (anoA !== anoB) return anoA - anoB;
        return semA - semB;
      });
    };

    const fetchDisciplinasComAtividades = async () => {
      try {
        const response = await fetch(`http://localhost:8000/disciplinas/usuario/${userId}`);
        const disciplinasData = await response.json();

        if (!response.ok) {
          console.error("Erro ao carregar disciplinas:", disciplinasData.detail);
          return;
        }

        const disciplinasComAtividades = await Promise.all(
          disciplinasData.map(async (disciplina) => {
            try {
              const res = await fetch(`http://localhost:8000/grades/usuario/${userId}/disciplina/${disciplina._id}`);
              const atividades = res.ok ? await res.json() : [];

              return {
                ...disciplina,
                atividades: atividades.map((a) => ({
                  id: a.id,
                  nome: a.tipo,
                  nota: a.valor,
                })),
              };
            } catch (error) {
              console.error("Erro ao buscar atividades:", error);
              return { ...disciplina, atividades: [] };
            }
          })
        );
        console.log("Disciplinas carregadas:", disciplinasData);
        const disciplinasOrdenadas = ordenarDisciplinasPorSemestre(disciplinasComAtividades);
        console.log("Disciplinas com atividades:", disciplinasComAtividades);

        const totaisPorSemestre = {};

        disciplinasOrdenadas.forEach((disciplina) => {
          const semestre = disciplina.semestre;
          const notas = disciplina.atividades.map((a) => a.nota).filter((n) => typeof n === "number");

          const soma = notas.reduce((s, n) => s + n, 0);

          if (!totaisPorSemestre[semestre]) {
            totaisPorSemestre[semestre] = { somaTotal: 0, numDisciplinas: 0 };
          }

          totaisPorSemestre[semestre].somaTotal += soma;
          totaisPorSemestre[semestre].numDisciplinas += 1;
        });

          const dados = Object.entries(totaisPorSemestre).map(([semestre, { somaTotal, numDisciplinas }]) => ({
            semestre,
            media: parseFloat((somaTotal / numDisciplinas).toFixed(2))
          }));


        dados.sort((a, b) => {
          const [anoA, semA] = a.semestre.split('/').map(Number);
          const [anoB, semB] = b.semestre.split('/').map(Number);
          if (anoA !== anoB) return anoA - anoB;
          return semA - semB;
        });

        console.log("Dados formatados para o gráfico:", dados);

        setDadosGrafico(dados);

        const medias = dados.map((d) => d.media);
        if (medias.length > 0) {
          setMaiorMedia(dados.reduce((prev, curr) => (curr.media > prev.media ? curr : prev)));
          setMenorMedia(dados.reduce((prev, curr) => (curr.media < prev.media ? curr : prev)));
          setMediaGeral((medias.reduce((a, b) => a + b, 0) / medias.length).toFixed(2));
        }
      } catch (error) {
        console.error("Erro na requisição de disciplinas:", error);
      }
      console.log("Maior média:", maiorMedia);
      console.log("Menor média:", menorMedia);
      console.log("Média geral:", mediaGeral);

    };

    fetchDisciplinasComAtividades();
  }, [userId]);

  return (
    <div id="webcrumbs-Estatisticas">
      <div className="w-[1200px] mt-1 p-1 bg-gradient-to-br from-blue-50 to-gray-100 rounded-lg shadow-md">
        <div className="bg-white p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg">
          <h3 className="text-3xl font-bold mb-4 text-gray-800">Nota Semestral Global (NSG) </h3>

          <div className="h-[400px] w-full mb-8">
            <Chart
              type="line"
              height={380}
              width="100%"
              series={[
                {
                  name: "NSG",
                  data: dadosGrafico.map((d) => d.media)
                }
              ]}
              options={{
                chart: {
                  dropShadow: {
                    enabled: true,
                    color: '#000',
                    top: 18,
                    left: 7,
                    blur: 10,
                    opacity: 0.2
                  },
                  toolbar: { show: false },
                  animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 800,
                    animateGradually: {
                      enabled: true,
                      delay: 150
                    },
                    dynamicAnimation: {
                      enabled: true,
                      speed: 350
                    }
                  }
                },
                colors: ['#1919CD'],
                dataLabels: {
                  enabled: true,
                  background: {
                    enabled: true,
                    borderRadius: 2,
                    padding: 4,
                    opacity: 0.9,
                    borderWidth: 1,
                    borderColor: '#fff'
                  }
                },
                stroke: {
                  curve: 'smooth',
                  width: 3
                },
                grid: {
                  borderColor: '#e0e0e0',
                  row: {
                    colors: ['#f8f9fa', 'transparent'],
                    opacity: 0.5
                  }
                },
                markers: {
                  size: 6,
                  colors: ['#fff'],
                  strokeColors: '#1919CD',
                  strokeWidth: 3,
                  hover: {
                    size: 8
                  }
                },
                xaxis: {
                  categories: dadosGrafico.map((d) => d.semestre),
                  title: { text: 'Semestre' }
                },
                yaxis: {
                  title: { text: 'Average Score' },
                  min: 50,
                  max: 100
                },
                tooltip: {
                  theme: 'dark',
                  y: {
                    formatter: function (val) {
                      return val.toFixed(1) + " points";
                    }
                  }
                },
                legend: {
                  position: 'top',
                  horizontalAlign: 'right',
                  floating: true,
                  offsetY: -25,
                  offsetX: -5
                }
              }}
            />
          </div>

          <div className="flex flex-row flex-wrap justify-between gap-6 mt-10">
            {maiorMedia && (
              <div className="bg-blue-50 p-4 rounded-lg transition-all duration-300 hover:shadow-md hover:bg-blue-100 flex-1">
                <h3 className="font-medium text-lg mb-2">Maior NSG</h3>
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-3xl mr-2" style={{ color: "#19cd2b" }}>trending_up</span>
                  <div>
                    <p className="text-2xl font-bold">{maiorMedia.media}</p>
                    <p className="text-gray-600 text-sm">{maiorMedia.semestre}</p>
                  </div>
                </div>
              </div>
            )}
            {menorMedia && (
              <div className="bg-blue-50 p-6 rounded-lg transition-all duration-300 hover:shadow-md hover:bg-blue-100 flex-1 transform hover:-translate-y-1">
                <h3 className="font-medium text-lg mb-2">Menor NSG</h3>
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-3xl mr-2" style={{ color: "#cd191c" }}>trending_down</span>
                  <div>
                    <p className="text-2xl font-bold">{menorMedia.media}</p>
                    <p className="text-gray-600 text-sm">{menorMedia.semestre}</p>
                  </div>
                </div>
              </div>
            )}
            {mediaGeral && (
              <div className="bg-blue-50 p-6 rounded-lg transition-all duration-300 hover:shadow-md hover:bg-blue-100 flex-1 transform hover:-translate-y-1">
                <h3 className="font-medium text-lg mb-2">Média</h3>
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-teal-600 text-3xl mr-2">monitoring</span>
                  <div>
                    <p className="text-2xl font-bold">{mediaGeral}</p>
                    <p className="text-gray-600 text-sm">Todos os semestres</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Estatisticas;
