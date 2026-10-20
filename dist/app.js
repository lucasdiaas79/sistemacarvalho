const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
const currencyFull = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

const projects = [
  { id: "gabriel", code: "GA", name: "Gabriel e Anelise", client: "Gabriel e Anelise", value: 20000, cost: 11300, projectedCost: 15100, progress: 72, status: "watch", statusLabel: "Revisar valor", address: "Endereço a informar", technical: "Responsável a definir", team: "2 diaristas · 3 empreiteiros", plannedStart: "17/08/2026", plannedEnd: "30/10/2026", actualStart: "17/08/2026", forecastEnd: "06/11/2026" },
  { id: "demolicao", code: "DM", name: "Demolição", client: "Casa da Construtora", value: 18000, cost: 14953, projectedCost: 16500, progress: 80, status: "risk", statusLabel: "Custo alto", address: "Endereço a informar", technical: "Responsável a definir", team: "8 diaristas · 1 empreiteiro", plannedStart: "17/08/2026", plannedEnd: "02/10/2026", actualStart: "17/08/2026", forecastEnd: "09/10/2026" },
  { id: "conceicao", code: "CC", name: "Conceição", client: "Conceição", value: 35300, cost: 5450, projectedCost: 28000, progress: 30, status: "ok", statusLabel: "No prazo", address: "Endereço a informar", technical: "Responsável a definir", team: "2 diaristas · 3 empreiteiros", plannedStart: "17/08/2026", plannedEnd: "18/12/2026", actualStart: "31/08/2026", forecastEnd: "18/12/2026" },
  { id: "narcizo", code: "NZ", name: "Narcizo", client: "Narcizo", value: 140000, cost: 14366, projectedCost: 118000, progress: 12, status: "watch", statusLabel: "Conferir custos", address: "Endereço a informar", technical: "Responsável a definir", team: "4 diaristas · empreiteiros por etapa", plannedStart: "31/08/2026", plannedEnd: "31/03/2027", actualStart: "31/08/2026", forecastEnd: "14/04/2027" },
  { id: "cleide", code: "CV", name: "Cleide e Valéria", client: "Cleide e Valéria", value: 25000, cost: 13900, projectedCost: 21000, progress: 48, status: "ok", statusLabel: "Em andamento", address: "Endereço a informar", technical: "Responsável a definir", team: "2 diaristas · 1 empreiteiro", plannedStart: "31/08/2026", plannedEnd: "30/10/2026", actualStart: "31/08/2026", forecastEnd: "30/10/2026" },
];

const stagesByProject = {
  gabriel: [["Elétrica", 100, 700, 700, "Concluído"], ["Gesso", 75, 1500, 900, "Em execução"], ["Pintura", 35, 2500, 600, "Em execução"], ["Cobertura", 50, 2500, 1200, "Em execução"]],
  demolicao: [["4º andar", 100, 6500, 6500, "Concluído"], ["3º andar", 100, 3000, 3000, "Concluído"], ["2º andar", 100, 3000, 3000, "Concluído"], ["1º andar", 0, 3000, 0, "Não iniciado"], ["Térreo", 100, 1500, 1500, "Concluído"], ["Material de apoio", 100, 2285, 2285, "Concluído"]],
  conceicao: [["Serviços preliminares", 30, 11105, 3332, "Em execução"], ["Revestimento e piso", 0, 10363, 0, "Não iniciado"], ["Pintura", 0, 4349, 0, "Não iniciado"], ["Elétrica", 0, 2486, 0, "Não iniciado"], ["Bancada", 0, 2000, 0, "Não iniciado"], ["Forro vinílico", 0, 947, 0, "Não iniciado"], ["Portas", 0, 4049, 0, "Não iniciado"]],
  narcizo: [["Aluguéis e canteiro", 35, 13737, 4781, "Em execução"], ["Demolição", 20, 5651, 1107, "Em execução"], ["Construção bruta", 8, 31915, 2600, "Em execução"], ["Porcelanatos", 0, 12917, 0, "Não iniciado"], ["Pintura", 0, 14605, 0, "Não iniciado"], ["Esquadrias", 0, 12946, 0, "Não iniciado"], ["Instalações", 0, 14428, 0, "Não iniciado"]],
  cleide: [["Serviços preliminares", 100, 5000, 5000, "Concluído"], ["Revestimento e piso", 45, 12000, 5400, "Em execução"], ["Rodapé", 0, 4000, 0, "Não iniciado"]],
};

const detailDocuments = [
  ["CON", "Contrato da obra", "Assinado em 12/08/2026", "Atualizado"],
  ["PRJ", "Projeto executivo", "Revisão 03", "Atualizado"],
  ["ART", "ART / RRT", "Documento pendente", "Pendente"],
  ["FOT", "Fotos da obra", "12 registros", "Atualizado"],
];

let currentProject = projects[2];
let currentDetailTab = "overview";

const defaultTransactions = [
  { id: 1, date: "06/10/2026", description: "Parcela do contrato", category: "Recebimento do cliente", project: "Gabriel e Anelise", type: "entrada", amount: 3100 },
  { id: 2, date: "07/10/2026", description: "Pagamento de equipe", category: "Mão de obra", project: "Narcizo", type: "saida", amount: 3780 },
  { id: 3, date: "08/10/2026", description: "Compra de escoras", category: "Material", project: "Demolição", type: "saida", amount: 1620 },
  { id: 4, date: "10/10/2026", description: "Parcela semanal", category: "Recebimento do cliente", project: "Cleide e Valéria", type: "entrada", amount: 3125 },
  { id: 5, date: "15/10/2026", description: "Medição da obra", category: "Recebimento do cliente", project: "Narcizo", type: "entrada", amount: 20000 },
  { id: 6, date: "20/10/2026", description: "Despesas do escritório", category: "Despesa administrativa", project: "Administrativo", type: "saida", amount: 600 },
  { id: 7, date: "24/10/2026", description: "Parcela do contrato", category: "Recebimento do cliente", project: "Conceição", type: "entrada", amount: 8825 },
];

const payroll = [
  { project: "Narcizo", total: 1100, people: [["Jamba", "Pedreiro", 400], ["Bruno", "Servente", 300], ["Fernando", "Servente", 400]] },
  { project: "Gabriel e Anelise", total: 1100, people: [["Daniel", "Pintor", 300], ["Edson", "Gesseiro", 800]] },
  { project: "Demolição", total: 900, people: [["Leandro", "Servente", 500], ["Tiago", "Servente", 400]] },
  { project: "Conceição", total: 0, people: [["Markes", "Pedreiro", 0], ["Ajudante", "Servente", 0]] },
];

const alerts = [
  { level: "critical", title: "Valor divergente em Gabriel e Anelise", text: "A visão geral registra R$ 20.000 e o controle da obra registra R$ 13.400.", action: "Comparar valores" },
  { level: "critical", title: "Cronograma acima do contrato", text: "Demolição e Narcizo possuem parcelas que superam o valor total informado.", action: "Revisar cronograma" },
  { level: "warning", title: "Custos de Narcizo não são somados", text: "Os valores foram digitados como texto e não entram no total da obra.", action: "Corrigir valores" },
  { level: "neutral", title: "Caixa não conciliado", text: "O saldo fecha em zero por lançamentos de ajuste, sem conferência bancária.", action: "Informar saldo" },
];

const chartData = [
  { month: "Ago", value: 20810, status: "received" },
  { month: "Set", value: 66003, status: "received" },
  { month: "Out", value: 51300, status: "expected" },
  { month: "Nov", value: 28825, status: "expected" },
  { month: "Dez", value: 20000, status: "expected" },
  { month: "Jan", value: 20000, status: "expected" },
  { month: "Fev", value: 20000, status: "expected" },
  { month: "Mar", value: 20000, status: "expected" },
];

let transactions = JSON.parse(localStorage.getItem("carvalho-transactions") || "null") || defaultTransactions;
let activeFinanceTab = "all";

const formatDate = (dateString) => {
  if (!dateString.includes("-")) return dateString;
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
};

function renderDashboardProjects() {
  const target = document.querySelector("#dashboardProjects");
  target.innerHTML = projects.slice(0, 4).map((p) => `
    <div class="project-row">
      <div class="project-name"><span class="project-code">${p.code}</span><span><strong>${p.name}</strong><small>${p.client}</small></span></div>
      <div class="project-progress"><div class="progress-line"><span style="width:${p.progress}%"></span></div><div class="progress-meta"><span>Execução</span><strong>${p.progress}%</strong></div></div>
      <div class="project-money"><strong>${currency.format(p.value)}</strong><small>Contrato</small></div>
      <span class="health-badge ${p.status}">${p.statusLabel}</span>
    </div>`).join("");
}

function renderChart() {
  const max = Math.max(...chartData.map((d) => d.value));
  document.querySelector("#cashChart").innerHTML = chartData.map((d) => {
    const height = Math.max(4, Math.round((d.value / max) * 205));
    return `<div class="bar-item" style="--height:${height}px"><em>${Math.round(d.value / 1000)}k</em><div class="bar ${d.status}" style="height:${height}px"></div><label>${d.month}</label></div>`;
  }).join("");
}

function renderUpcoming() {
  const status = ["Hoje", "Amanhã", "Em 2 dias", "Em 4 dias"];
  document.querySelector("#upcomingPayments").innerHTML = transactions.slice(-4).map((t, i) => `
    <tr><td>${t.date.slice(0,5)}</td><td><strong>${t.description}</strong></td><td>${t.project}</td><td class="${t.type === "entrada" ? "amount-in" : "amount-out"}">${t.type === "saida" ? "−" : "+"} ${currencyFull.format(t.amount)}</td><td><span class="table-status ${i === 0 ? "today" : "soon"}">${status[i]}</span></td></tr>
  `).join("");
}

function renderProjects(query = "") {
  const normalized = query.trim().toLowerCase();
  const filtered = projects.filter((p) => `${p.name} ${p.client}`.toLowerCase().includes(normalized));
  document.querySelector("#projectsGrid").innerHTML = filtered.map((p) => `
    <article class="project-card">
      <div class="project-card-head"><span class="project-code">${p.code}</span><span class="health-badge ${p.status}">${p.statusLabel}</span></div>
      <h2>${p.name}</h2><span class="client">Cliente: ${p.client}</span>
      <div class="project-progress"><div><span>Execução física</span><strong>${p.progress}%</strong></div><div class="progress-line"><span style="width:${p.progress}%"></span></div></div>
      <div class="project-card-values"><div><span>Contrato</span><strong>${currency.format(p.value)}</strong></div><div><span>Custo lançado</span><strong>${currency.format(p.cost)}</strong></div></div>
      <div class="project-card-footer"><button class="open-project" data-project-id="${p.id}">Abrir ficha completa</button></div>
    </article>
  `).join("");
}

function renderProjectDetail(projectId) {
  currentProject = projects.find((project) => project.id === projectId) || projects[0];
  const marginValue = currentProject.value - currentProject.projectedCost;
  const marginPercent = Math.round((marginValue / currentProject.value) * 100);
  document.querySelector("#detailCode").textContent = currentProject.code;
  document.querySelector("#projectDetailTitle").textContent = currentProject.name;
  document.querySelector("#detailClient").textContent = `Cliente: ${currentProject.client}`;
  document.querySelector("#detailMetrics").innerHTML = `
    <article><span>Contrato</span><strong>${currency.format(currentProject.value)}</strong><small>Valor contratado</small></article>
    <article><span>Avanço físico</span><strong>${currentProject.progress}%</strong><small>Atualização da engenharia</small></article>
    <article><span>Custo realizado</span><strong>${currency.format(currentProject.cost)}</strong><small>Lançamentos vinculados</small></article>
    <article><span>Margem prevista</span><strong class="positive-value">${currency.format(marginValue)} · ${marginPercent}%</strong><small>Contrato menos custo projetado</small></article>
    <article><span>Previsão de conclusão</span><strong>${currentProject.forecastEnd}</strong><small>${currentProject.statusLabel}</small></article>`;
  document.querySelector("#registerGrid").innerHTML = `
    <div class="register-item"><span>Cliente</span><strong>${currentProject.client}</strong><small>Contratante principal</small></div>
    <div class="register-item"><span>Endereço</span><strong>${currentProject.address}</strong><small>Local da execução</small></div>
    <div class="register-item"><span>Responsável técnico</span><strong>${currentProject.technical}</strong><small>Engenheiro ou arquiteto</small></div>
    <div class="register-item"><span>Equipe atual</span><strong>${currentProject.team}</strong><small>Alocação desta semana</small></div>
    <div class="register-item"><span>Início previsto</span><strong>${currentProject.plannedStart}</strong><small>Data contratual</small></div>
    <div class="register-item"><span>Início realizado</span><strong>${currentProject.actualStart}</strong><small>Primeiro dia executado</small></div>
    <div class="register-item"><span>Término previsto</span><strong>${currentProject.plannedEnd}</strong><small>Prazo original</small></div>
    <div class="register-item"><span>Conclusão atual</span><strong>${currentProject.forecastEnd}</strong><small>Previsão recalculada</small></div>`;
  currentDetailTab = "overview";
  document.querySelectorAll("[data-detail-tab]").forEach((button) => button.classList.toggle("active", button.dataset.detailTab === currentDetailTab));
  renderDetailTab();
  showView("obra-detalhe");
}

function renderDetailTab() {
  const target = document.querySelector("#detailTabContent");
  const stages = stagesByProject[currentProject.id];
  if (currentDetailTab === "overview") {
    target.innerHTML = `<div class="detail-overview-grid">
      <article class="panel progress-panel"><h2>Avanço físico-financeiro</h2><div class="big-progress"><div class="progress-ring" style="--progress:${currentProject.progress}"><strong>${currentProject.progress}%</strong></div><div class="progress-summary"><strong>${currentProject.statusLabel}</strong><span>${stages.filter((s) => s[1] === 100).length} de ${stages.length} etapas concluídas</span><div class="financial-progress"><div><span><label>Orçamento comprometido</label><strong>${Math.round((currentProject.projectedCost / currentProject.value) * 100)}%</strong></span><div class="progress-line"><span style="width:${Math.min(100, (currentProject.projectedCost / currentProject.value) * 100)}%"></span></div></div><div><span><label>Custo realizado</label><strong>${Math.round((currentProject.cost / currentProject.value) * 100)}%</strong></span><div class="progress-line"><span style="width:${Math.min(100, (currentProject.cost / currentProject.value) * 100)}%"></span></div></div></div></div></div></article>
      <article class="panel activity-panel"><h2>Últimas atualizações</h2><div class="activity-list"><div class="activity-row"><span class="activity-dot"></span><div><strong>Diário de obra atualizado</strong><small>Equipe e serviços executados foram registrados</small></div><time>Hoje</time></div><div class="activity-row"><span class="activity-dot"></span><div><strong>Pagamento de equipe lançado</strong><small>Vinculado automaticamente ao custo da obra</small></div><time>Ontem</time></div><div class="activity-row"><span class="activity-dot"></span><div><strong>Cronograma revisado</strong><small>Previsão de conclusão recalculada</small></div><time>06 out</time></div></div></article>
    </div>`;
  }
  if (currentDetailTab === "schedule") {
    target.innerHTML = `<article class="detail-section"><div class="detail-section-head"><div><h2>Cronograma físico-financeiro</h2><p>Avanço, orçamento e custo por etapa</p></div><button class="secondary-button" data-toast="Etapa pronta para cadastro">Adicionar etapa</button></div><div class="table-wrap"><table class="schedule-table"><thead><tr><th>Etapa</th><th>Período previsto</th><th>Avanço</th><th>Orçamento</th><th>Realizado</th><th>Situação</th></tr></thead><tbody>${stages.map((stage, index) => `<tr><td class="stage-name">${stage[0]}</td><td>${index < 2 ? "Ago — Out/26" : "Out — Dez/26"}</td><td><div class="stage-progress"><div class="progress-line"><span style="width:${stage[1]}%"></span></div><small>${stage[1]}% concluído</small></div></td><td>${currency.format(stage[2])}</td><td>${currency.format(stage[3])}</td><td><span class="health-badge ${stage[1] === 100 ? "ok" : stage[1] > 0 ? "watch" : ""}">${stage[4]}</span></td></tr>`).join("")}</tbody></table></div></article>`;
  }
  if (currentDetailTab === "control") {
    target.innerHTML = `<div class="control-grid">
      <article class="detail-section control-card"><div class="detail-section-head"><div><h2>Compras e entregas</h2><p>Materiais críticos vinculados à etapa</p></div><button class="secondary-button" data-toast="Pedido de compra preparado">Novo pedido</button></div><div class="control-list"><div><span class="status-dot risk"></span><span><strong>Porcelanato e argamassa</strong><small>Solicitar 3 cotações · necessário até 15 out</small></span><b>Pendente</b></div><div><span class="status-dot watch"></span><span><strong>Esquadrias sob medida</strong><small>Fornecedor selecionado · aguardando aprovação</small></span><b>Aprovar</b></div><div><span class="status-dot ok"></span><span><strong>Material estrutural</strong><small>Entrega conferida em 07 out · nota anexada</small></span><b>Recebido</b></div></div></article>
      <article class="detail-section control-card"><div class="detail-section-head"><div><h2>Medições e faturamento</h2><p>Produção aprovada e cobrança do cliente</p></div><button class="secondary-button" data-toast="Nova medição preparada">Nova medição</button></div><div class="measurement-summary"><div><span>Próxima medição</span><strong>15 out 2026</strong><small>${currency.format(20000)} previsto</small></div><div><span>Já faturado</span><strong>${currency.format(Math.round(currentProject.value * .3))}</strong><small>30% do contrato</small></div><div><span>A receber</span><strong>${currency.format(Math.round(currentProject.value * .7))}</strong><small>Saldo contratual</small></div></div></article>
      <article class="detail-section control-card wide"><div class="detail-section-head"><div><h2>Segurança, qualidade e aprovações</h2><p>Checklist enxuto para reduzir retrabalho e risco</p></div><button class="secondary-button" data-toast="Checklist diário preparado">Abrir checklist</button></div><div class="quality-grid"><div><span class="check ok">✓</span><span><strong>Segurança do dia</strong><small>EPI e organização conferidos</small></span></div><div><span class="check ok">✓</span><span><strong>Qualidade da etapa</strong><small>Serviço liberado pelo encarregado</small></span></div><div><span class="check pending">!</span><span><strong>Aprovação do cliente</strong><small>1 decisão aguardando retorno</small></span></div><div><span class="check pending">!</span><span><strong>Projeto / execução</strong><small>1 divergência para validar</small></span></div></div></article>
    </div>`;
  }
  if (currentDetailTab === "documents") {
    target.innerHTML = `<article class="detail-section"><div class="detail-section-head"><div><h2>Documentos, projetos e fotos</h2><p>Arquivos organizados por obra e revisão</p></div><button class="secondary-button" data-toast="Envio de documento preparado">Adicionar documento</button></div><div class="documents-grid">${detailDocuments.map((doc) => `<div class="document-card"><span class="document-icon">${doc[0]}</span><span><strong>${doc[1]}</strong><small>${doc[2]}</small></span><span class="doc-status ${doc[3] === "Pendente" ? "missing" : ""}">${doc[3]}</span></div>`).join("")}</div></article>`;
  }
  if (currentDetailTab === "diary") {
    target.innerHTML = `<article class="detail-section"><div class="detail-section-head"><div><h2>Diário de obra</h2><p>Histórico diário de equipe, clima e execução</p></div><button class="secondary-button" data-toast="Novo diário aberto">Novo registro</button></div><div class="timeline"><div class="diary-entry"><div class="diary-date"><strong>08 out 2026</strong><small>Quinta-feira</small></div><div class="diary-body"><h3>Execução normal</h3><p>Continuidade dos serviços da etapa atual. Sem ocorrência de segurança ou interrupção.</p><div class="diary-tags"><span>Clima: ensolarado</span><span>Equipe: ${currentProject.team}</span><span>4 fotos</span></div></div></div><div class="diary-entry"><div class="diary-date"><strong>07 out 2026</strong><small>Quarta-feira</small></div><div class="diary-body"><h3>Material recebido</h3><p>Entrega conferida pela equipe da obra e vinculada ao pedido de compra.</p><div class="diary-tags"><span>1 entrega</span><span>Nota anexada</span><span>2 fotos</span></div></div></div><div class="diary-entry"><div class="diary-date"><strong>06 out 2026</strong><small>Terça-feira</small></div><div class="diary-body"><h3>Revisão do cronograma</h3><p>Datas das próximas etapas atualizadas conforme disponibilidade da equipe.</p><div class="diary-tags"><span>Cronograma</span><span>Responsável técnico</span></div></div></div></div></article>`;
  }
  if (currentDetailTab === "issues") {
    target.innerHTML = `<article class="detail-section"><div class="detail-section-head"><div><h2>Pendências e ocorrências</h2><p>Responsável, prazo e impacto em um só lugar</p></div><button class="secondary-button" data-toast="Nova ocorrência aberta">Registrar ocorrência</button></div><div class="issue-list"><div class="issue-row"><span class="priority high">ALTA</span><strong>Confirmar responsável técnico</strong><span><small>Responsável</small>Mario</span><span><small>Prazo</small>Hoje</span><span class="health-badge risk">Aberta</span></div><div class="issue-row"><span class="priority medium">MÉDIA</span><strong>Anexar ART / RRT</strong><span><small>Responsável</small>Administrativo</span><span><small>Prazo</small>10 out</span><span class="health-badge watch">Pendente</span></div><div class="issue-row"><span class="priority low">BAIXA</span><strong>Atualizar fotos da etapa</strong><span><small>Responsável</small>Encarregado</span><span><small>Prazo</small>11 out</span><span class="health-badge ok">Em curso</span></div></div></article>`;
  }
  if (currentDetailTab === "changes") {
    target.innerHTML = `<article class="detail-section"><div class="detail-section-head"><div><h2>Aditivos e alterações de escopo</h2><p>Impacto no contrato e no prazo</p></div><button class="secondary-button" data-toast="Novo aditivo preparado">Adicionar aditivo</button></div><div class="change-list"><div class="change-row"><span class="priority medium">ADITIVO 01</span><strong>Serviço complementar solicitado pelo cliente</strong><span><small>Impacto financeiro</small>+ ${currency.format(1800)}</span><span><small>Impacto no prazo</small>+ 5 dias</span><span class="health-badge watch">Em aprovação</span></div></div><div class="empty-state"><strong>Histórico de escopo centralizado</strong><p>Quando aprovado, o aditivo atualiza automaticamente o valor contratado, a margem e a previsão de conclusão.</p></div></article>`;
  }
  target.querySelectorAll("[data-toast]").forEach((button) => button.addEventListener("click", () => showToast(button.dataset.toast, "Fluxo demonstrativo pronto para a próxima fase.")));
}

function projectOptions() {
  return projects.map((p) => `<option value="${p.name}">${p.name}</option>`).join("") + `<option value="Administrativo">Administrativo</option>`;
}

function renderFinance() {
  const selectedProject = document.querySelector("#financeProjectFilter")?.value || "";
  const filtered = transactions.filter((t) => (activeFinanceTab === "all" || t.type === activeFinanceTab) && (!selectedProject || t.project === selectedProject));
  document.querySelector("#transactionsTable").innerHTML = filtered.map((t) => `
    <tr><td>${formatDate(t.date)}</td><td><strong>${t.description}</strong></td><td>${t.category}</td><td>${t.project}</td><td><span class="transaction-type ${t.type}">${t.type === "entrada" ? "Entrada" : "Saída"}</span></td><td class="align-right ${t.type === "entrada" ? "amount-in" : "amount-out"}">${t.type === "saida" ? "−" : "+"} ${currencyFull.format(t.amount)}</td></tr>
  `).join("") || `<tr><td colspan="6">Nenhum lançamento encontrado.</td></tr>`;

  const income = transactions.filter((t) => t.type === "entrada").reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions.filter((t) => t.type === "saida").reduce((sum, t) => sum + t.amount, 0);
  document.querySelector("#incomeTotal").textContent = currency.format(income);
  document.querySelector("#expenseTotal").textContent = currency.format(expense);
  document.querySelector("#balanceTotal").textContent = currency.format(income - expense);
  document.querySelector("#cashMetric").textContent = currencyFull.format(income - expense);
}

function renderPayroll() {
  document.querySelector("#payrollGrid").innerHTML = payroll.map((group) => `
    <article class="payroll-card"><div class="payroll-card-head"><h2>${group.project}</h2><strong>${currency.format(group.total)}</strong></div>${group.people.map((p) => `<div class="worker-row"><span><strong>${p[0]}</strong></span><span>${p[1]}</span><strong>${currency.format(p[2])}</strong></div>`).join("")}</article>
  `).join("");
}

function renderAlerts() {
  document.querySelector("#alertsList").innerHTML = alerts.map((a) => `
    <article class="alert-card"><span class="attention-icon ${a.level}">${a.level === "neutral" ? "i" : "!"}</span><div><h2>${a.title}</h2><p>${a.text}</p></div><button class="alert-action">${a.action}</button></article>
  `).join("");
}

function showView(viewName) {
  document.querySelectorAll(".view").forEach((view) => view.classList.toggle("active", view.id === `view-${viewName}`));
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.view === viewName));
  document.body.classList.remove("menu-open");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openModal() {
  const modal = document.querySelector("#entryModal");
  modal.hidden = false;
  setTimeout(() => modal.querySelector("input[name=description]").focus(), 50);
}

function closeModal() {
  document.querySelector("#entryModal").hidden = true;
}

function showToast(title = "Lançamento salvo", text = "O financeiro foi atualizado.") {
  const toast = document.querySelector("#toast");
  toast.querySelector("strong").textContent = title;
  toast.querySelector("small").textContent = text;
  toast.classList.add("visible");
  setTimeout(() => toast.classList.remove("visible"), 3000);
}

document.querySelectorAll("[data-view]").forEach((element) => element.addEventListener("click", (event) => {
  event.preventDefault();
  showView(element.dataset.view);
}));
document.querySelectorAll("[data-open-entry]").forEach((button) => button.addEventListener("click", openModal));
document.querySelectorAll("[data-close-modal]").forEach((button) => button.addEventListener("click", closeModal));
document.querySelector("#entryModal").addEventListener("click", (event) => { if (event.target.id === "entryModal") closeModal(); });
document.querySelector("#mobileMenu").addEventListener("click", () => document.body.classList.toggle("menu-open"));
document.querySelector("#projectSearch").addEventListener("input", (event) => renderProjects(event.target.value));
document.querySelector("#projectsGrid").addEventListener("click", (event) => {
  const button = event.target.closest("[data-project-id]");
  if (button) renderProjectDetail(button.dataset.projectId);
});
document.querySelector("#backToProjects").addEventListener("click", () => showView("obras"));
document.querySelectorAll("[data-detail-tab]").forEach((button) => button.addEventListener("click", () => {
  currentDetailTab = button.dataset.detailTab;
  document.querySelectorAll("[data-detail-tab]").forEach((tab) => tab.classList.toggle("active", tab === button));
  renderDetailTab();
}));
document.querySelector("#editProjectInfo").addEventListener("click", () => showToast("Cadastro selecionado", "Os campos serão editáveis na versão conectada ao banco de dados."));
document.querySelector("#addIssue").addEventListener("click", () => { currentDetailTab = "issues"; document.querySelectorAll("[data-detail-tab]").forEach((tab) => tab.classList.toggle("active", tab.dataset.detailTab === "issues")); renderDetailTab(); showToast("Ocorrências abertas", "Registre prioridade, responsável e prazo."); });
document.querySelector("#addDiary").addEventListener("click", () => { currentDetailTab = "diary"; document.querySelectorAll("[data-detail-tab]").forEach((tab) => tab.classList.toggle("active", tab.dataset.detailTab === "diary")); renderDetailTab(); showToast("Diário aberto", "Registre equipe, clima, serviços e fotos."); });
document.querySelector("#financeProjectFilter").innerHTML = `<option value="">Todas as obras</option>${projectOptions()}`;
document.querySelector("#entryForm select[name=project]").innerHTML = projectOptions();
document.querySelector("#financeProjectFilter").addEventListener("change", renderFinance);
document.querySelectorAll("[data-finance-tab]").forEach((button) => button.addEventListener("click", () => {
  activeFinanceTab = button.dataset.financeTab;
  document.querySelectorAll("[data-finance-tab]").forEach((b) => b.classList.toggle("active", b === button));
  renderFinance();
}));

document.querySelector("#entryForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const parsedAmount = Number(String(data.get("amount")).replace(/[^0-9,.-]/g, "").replace(".", "").replace(",", "."));
  if (!parsedAmount || parsedAmount <= 0) return;
  transactions.unshift({ id: Date.now(), type: data.get("type"), description: data.get("description"), amount: parsedAmount, date: data.get("date"), project: data.get("project"), category: data.get("category") });
  localStorage.setItem("carvalho-transactions", JSON.stringify(transactions));
  event.currentTarget.reset();
  event.currentTarget.querySelector("input[name=date]").value = "2026-10-08";
  closeModal(); renderFinance(); renderUpcoming(); showToast();
});

document.querySelector("#globalSearch").addEventListener("input", (event) => {
  if (event.target.value.length > 1) { showView("obras"); document.querySelector("#projectSearch").value = event.target.value; renderProjects(event.target.value); }
});
document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); document.querySelector("#globalSearch").focus(); }
  if (event.key === "Escape") closeModal();
});

document.querySelector("#newProject").addEventListener("click", () => showToast("Próxima etapa", "O cadastro completo entra na versão com banco de dados."));
document.querySelector("#newPayment").addEventListener("click", () => showToast("Pagamento iniciado", "Use Novo lançamento para registrar a saída agora."));
document.querySelector("#configureBank").addEventListener("click", () => showToast("Conciliação preparada", "A conexão bancária será ativada na próxima fase."));
document.querySelector("#alertsList").addEventListener("click", (event) => { if (event.target.closest(".alert-action")) showToast("Revisão aberta", "Esta pendência foi selecionada para conferência."); });

function registerWebMCP() {
  const context = document.modelContext;
  if (!context?.registerTool) return;
  const tools = [
    {
      name: "open_management_view",
      title: "Abrir área do sistema",
      description: "Abre uma das áreas visíveis do sistema Carvalho Gestão.",
      inputSchema: { type: "object", properties: { view: { type: "string", enum: ["dashboard", "obras", "financeiro", "pagamentos", "alertas"] } }, required: ["view"], additionalProperties: false },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute(input) { showView(input.view); return { view: input.view, opened: true }; },
    },
    {
      name: "record_financial_entry",
      title: "Registrar lançamento financeiro",
      description: "Registra uma entrada ou saída e atualiza o financeiro visível.",
      inputSchema: { type: "object", properties: { type: { type: "string", enum: ["entrada", "saida"] }, description: { type: "string", minLength: 2 }, amount: { type: "number", exclusiveMinimum: 0 }, date: { type: "string" }, project: { type: "string" }, category: { type: "string" } }, required: ["type", "description", "amount", "date", "project", "category"], additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) { transactions.unshift({ id: Date.now(), ...input }); localStorage.setItem("carvalho-transactions", JSON.stringify(transactions)); renderFinance(); renderUpcoming(); return { saved: true, balance: transactions.reduce((sum, t) => sum + (t.type === "entrada" ? t.amount : -t.amount), 0) }; },
    },
    {
      name: "open_project_record",
      title: "Abrir ficha de obra",
      description: "Abre a ficha completa de uma obra com cronograma, documentos, diário, pendências e aditivos.",
      inputSchema: { type: "object", properties: { projectId: { type: "string", enum: projects.map((project) => project.id) } }, required: ["projectId"], additionalProperties: false },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute(input) { renderProjectDetail(input.projectId); return { opened: true, project: currentProject.name, progress: currentProject.progress }; },
    },
  ];
  tools.forEach((tool) => { try { Promise.resolve(context.registerTool(tool)).catch(() => {}); } catch (_) {} });
}

renderDashboardProjects(); renderChart(); renderUpcoming(); renderProjects(); renderFinance(); renderPayroll(); renderAlerts(); registerWebMCP();
