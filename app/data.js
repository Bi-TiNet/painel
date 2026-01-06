// app/data.js

export const links = [
    { nome: "Comercial", url: "https://app.powerbi.com/reportEmbed?reportId=0d1ef2a2-5887-408f-84d8-a46d411a1bdc&autoAuth=true&ctid=51e25658-c82f-4bfc-b491-2f350e67fe2c&navContentPaneEnabled=false&filterPaneEnabled=false&fullscreen=true" },
    { nome: "Reduzidos", url: "https://app.powerbi.com/reportEmbed?reportId=f64af684-ac51-4ece-87f5-b63379e59acf&autoAuth=true&ctid=51e25658-c82f-4bfc-b491-2f350e67fe2c&navContentPaneEnabled=false&filterPaneEnabled=false&fullscreen=true" },
    { nome: "Bloqueados", url: "https://app.powerbi.com/reportEmbed?reportId=af9c50de-33ce-4281-93dd-d86d61c94e60&autoAuth=true&ctid=51e25658-c82f-4bfc-b491-2f350e67fe2c&navContentPaneEnabled=false&filterPaneEnabled=false&fullscreen=true" },
    { nome: "Técnicos", url: "https://app.powerbi.com/reportEmbed?reportId=e71d279f-c612-4c46-b89b-7da1a1d2759c&autoAuth=true&ctid=51e25658-c82f-4bfc-b491-2f350e67fe2c&navContentPaneEnabled=false&filterPaneEnabled=false&fullscreen=true" },
    { nome: "Suporte Técnico", url: "https://app.powerbi.com/reportEmbed?reportId=28dcc1da-2fbf-4d2b-9dfc-2321c215096e&autoAuth=true&ctid=51e25658-c82f-4bfc-b491-2f350e67fe2c&navContentPaneEnabled=false&filterPaneEnabled=false&fullscreen=true" },
    { nome: "Pesquisa de Satisfação", url: "https://app.powerbi.com/reportEmbed?reportId=fabe23fd-6717-4e86-8546-061be11850d5&autoAuth=true&ctid=51e25658-c82f-4bfc-b491-2f350e67fe2c&navContentPaneEnabled=false&filterPaneEnabled=false" },
];

export const funcionarios = [
    { nome: "Nathalia Gama", dia: 8, mes: 1, foto: "/fotos/nathalia.jpg" },
    { nome: "Quezia Ribeiro", dia: 24, mes: 2, foto: "/fotos/quezia.jpg" },
    { nome: "Taiane Lima", dia: 8, mes: 3, foto: "/fotos/taiane.jpg" },
    { nome: "Vagner Garcia", dia: 11, mes: 3, foto: "/fotos/vagner.jpg" },
    { nome: "Rafael Santos", dia: 26, mes: 3, foto: "/fotos/rafael.jpg" },
    { nome: "Luana Almeida", dia: 9, mes: 4, foto: "/fotos/luana.jpg" },
    { nome: "Edmilson Rocha", dia: 12, mes: 4, foto: "/fotos/edmilson_rocha.jpg" },
    { nome: "Lucas Oliveira", dia: 20, mes: 5, foto: "/fotos/lucas_oliveira.jpg" },
    { nome: "Joyce Pinna", dia: 23, mes: 5, foto: "/fotos/joyce.jpg" },
    { nome: "Dalila Meira", dia: 9, mes: 6, foto: "/fotos/dalila.jpg" },
    { nome: "Edvanildo Rodrigues", dia: 14, mes: 6, foto: "/fotos/edvanildo.jpg" },
    { nome: "Jefersson Abade", dia: 19, mes: 7, foto: "/fotos/jefersson.jpg" },
    { nome: "Daniele França", dia: 20, mes: 7, foto: "/fotos/daniele_frança.jpg" },
    { nome: "Carlos Júnior", dia: 30, mes: 7, foto: "/fotos/carlos.jpg" },
    { nome: "Valdete", dia: 6, mes: 8, foto: "/fotos/valdete.jpg" },
    { nome: "Gabriel Ferreira", dia: 8, mes: 8, foto: "/fotos/gabriel_ferreira.jpg" },
    { nome: "Leandro Roberto", dia: 17, mes: 8, foto: "/fotos/leandro.jpg" },
    { nome: "Matheus Silva", dia: 23, mes: 8, foto: "/fotos/matheus_silva.jpg" },
    { nome: "Daniela Bento", dia: 9, mes: 10, foto: "/fotos/daniela.jpg" },
    { nome: "Josenilson", dia: 14, mes: 10, foto: "/fotos/josenilson.jpg" },
    { nome: "Diego França", dia: 4, mes: 11, foto: "/fotos/diego_frança.png" },
    { nome: "Roberth Davino", dia: 11, mes: 11, foto: "/fotos/roberth.jpg" },
    { nome: "Jackson Araújo", dia: 16, mes: 11, foto: "/fotos/jackson.jpg" },
    { nome: "Gisele São Miguel", dia: 18, mes: 11, foto: "/fotos/gisele.jpg" },
    { nome: "Matheus Santos", dia: 21, mes: 11, foto: "/fotos/matheus_santos.jpg" },
    { nome: "Edmilson Silva", dia: 4, mes: 12, foto: "/fotos/edmilson_silva.jpg" }
];

// ADICIONE ESTA PARTE AO SEU ARQUIVO
export const adminUsers = [
    { user: 'Diego França', pass: 'DFti@2025' },
    { user: 'Daniele França', pass: 'DFTinet@2025' },
    { user: 'Carlos Júnior', pass: 'DCjr@2806' },
];

export const departamentos = [
    { id: 'geral', nome: "Geral (Todos)", cor: "#9ca3af" }, // Cinza
    { id: 'adm', nome: "ADM", cor: "#eab308" }, // Amarelo
    { id: 'comercial', nome: "Comercial", cor: "#3b82f6" }, // Azul
    { id: 'financeiro', nome: "Financeiro", cor: "#22c55e" }, // Verde
    { id: 'suporte', nome: "Suporte Técnico", cor: "#f97316" }, // Laranja
    { id: 'equipe', nome: "Equipe Técnica", cor: "#8b5cf6" }, // Roxo
];

export const tiposDeComunicado = [
    { id: 'aviso', nome: "Aviso Geral", cor: "#3b82f6" },
    { id: 'reuniao', nome: "Reunião", cor: "#f97316" },
    { id: 'meta', nome: "Parabenização por Meta", cor: "#22c55e" },
    { id: 'evento', nome: "Evento", cor: "#8b5cf6" },
];

export const initialKpis = [
  { id: 1, departamento: "Comercial", nome: "Novo Contrato", valor: "90" },
  { id: 2, departamento: "Suporte Técnico", nome: "Avaliação", valor: "4.70" },
  { id: 3, departamento: "Comercial", nome: "Upgrade", valor: "25" },
  { id: 4, departamento: "Equipe Técnica", nome: "OS", valor: "300" },
];

export const initialComunicados = [
  { 
    id: 1, 
    tipo: 'AVISO', 
    texto: 'Escala Final de Semana:\nSábado de Manhã - Rafael e Edvanildo\nSáb tarde e Dom - Edmilson e Josenilson\nNOC: Folga: Jean e Matheus',
    autor: 'Diretoria',
    departamentos: ['Geral (Todos)']
  },
  { 
    id: 2, 
    tipo: 'REUNIAO', 
    texto: 'Reunião geral de alinhamento amanhã às 10:00.',
    autor: 'Carlos Júnior',
    departamentos: ['Geral (Todos)']
  }
];