import { Activity, BarChart3, BookOpen, CheckSquare, CircleDollarSign, FileText, LayoutDashboard, Megaphone, ShoppingBag, Target, Users } from "lucide-react";

const groups = [
  { label: "VISÃO GERAL", items: [{ label: "Dashboard", icon: LayoutDashboard, active: true }, { label: "Estratégia e metas", icon: Target }] },
  { label: "UNIDADES DE NEGÓCIO", items: [{ label: "Instagram", icon: Megaphone }, { label: "Marketing", icon: BarChart3 }, { label: "CRM e leads", icon: Users }, { label: "Vendas", icon: ShoppingBag }] },
  { label: "GESTÃO CORPORATIVA", items: [{ label: "Financeiro", icon: CircleDollarSign }, { label: "Operações e POPs", icon: CheckSquare }, { label: "Relatórios", icon: FileText }] }
];
const metrics = [
  ["Faturamento do mês", "R$ 0,00", "Aguardando lançamentos"],
  ["Vendas aprovadas", "0", "Pedidos confirmados"],
  ["Leads recebidos", "0", "Novas oportunidades"],
  ["Tarefas pendentes", "0", "Atividades em aberto"]
];
const actions = [
  ["Registrar publicação", "Adicionar conteúdo e métricas", Megaphone],
  ["Cadastrar lead", "Registrar novo interessado", Users],
  ["Registrar venda", "Adicionar pedido aprovado", ShoppingBag],
  ["Lançamento financeiro", "Registrar receita ou despesa", CircleDollarSign],
  ["Criar tarefa", "Organizar uma atividade", CheckSquare],
  ["Consultar POPs", "Acessar procedimentos", BookOpen]
] as const;

export default function Home() {
  return <div className="shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark">C</div><span>CENTRAL DE GESTÃO</span></div>
      <nav className="nav-group">{groups.map(group => <div className="nav-group" key={group.label}>
        <div className="nav-label">{group.label}</div>
        {group.items.map(item => { const Icon = item.icon; return <a href="#" key={item.label} className={`nav-link ${item.active ? "active" : ""}`}><Icon size={16} strokeWidth={1.7}/>{item.label}</a>; })}
      </div>)}</nav>
      <div className="sidebar-note"><strong style={{color:"#eee"}}>Fase 01 · Fundador</strong><br/>Operação enxuta, processos documentados e gestão centralizada.</div>
    </aside>
    <main className="main">
      <header className="topbar"><span>Empresa / Visão geral</span><span>Fundador / CEO　●</span></header>
      <div className="content">
        <div className="eyebrow">CENTRAL DE OPERAÇÕES · 2026</div>
        <h1>Visão geral</h1>
        <p className="subtitle">Acompanhe a saúde da operação e as prioridades da empresa.</p>
        <div className="kpis">{metrics.map(([label,value,note]) => <section className="panel kpi" key={label}><div className="kpi-label">{label}</div><div className="kpi-value">{value}</div><div className="kpi-note">{note}</div></section>)}</div>
        <div className="section-head"><span>Desempenho das unidades</span><span className="muted">Indicadores aguardando dados reais</span></div>
        <div className="columns">
          <section className="panel panel-pad"><div style={{display:"flex",justifyContent:"space-between",fontSize:13,fontWeight:650}}>Mídia e audiência <Activity size={16}/></div><div className="empty"><BarChart3 size={24}/><strong>Nenhum indicador registrado</strong><span>Cadastre publicações e métricas do Instagram para acompanhar alcance, engajamento e crescimento.</span></div></section>
          <section className="panel panel-pad"><div style={{display:"flex",justifyContent:"space-between",fontSize:13,fontWeight:650}}>Comercial e vendas <ShoppingBag size={16}/></div><div className="empty"><Activity size={24}/><strong>Nenhuma venda registrada</strong><span>Os resultados comerciais aparecerão aqui após o cadastro de leads e pedidos.</span></div></section>
        </div>
        <div className="section-head"><span>Acesso rápido</span><span className="muted">Atalhos da operação</span></div>
        <div className="shortcuts">{actions.map(([title,desc,Icon]) => <a href="#" className="shortcut" key={title}><div className="shortcut-icon"><Icon size={17}/></div><div><strong>{title}</strong><small>{desc}</small></div></a>)}</div>
        <div className="notice">Rotina de gestão: revisão semanal dos indicadores, análise de gargalos e definição das prioridades da próxima semana.</div>
      </div>
    </main>
  </div>;
}