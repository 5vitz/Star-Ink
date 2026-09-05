/**
 * STAR INK — SISTEMA DE TELEMETRIA DOS 19 AGENTES DE IA (ARQUITETURA DESCENTRALIZADA)
 * 
 * Este módulo fornece a infraestrutura de dados para monitorar o status, saúde,
 * execuções e tarefas ativas da frota de 19 Agentes distribuídos nos 8 Departamentos.
 */

export interface AgentTelemetrySpec {
  id: string;
  name: string;
  role: string;
  departmentId: string;
  departmentCode: string;
  departmentName: string;
  status: 'online' | 'processing' | 'idle' | 'warning';
  lastRun: string;
  kpiHighlight: string;
  activeTaskCount: number;
  recentLogs: string[];
}

export interface DepartmentTelemetrySpec {
  code: string;
  id: string;
  name: string;
  agents: AgentTelemetrySpec[];
  departmentStatus: 'operational' | 'busy' | 'alert';
  activeAgentsCount: number;
}

export interface AgentFleetOverview {
  totalAgents: number;
  onlineAgents: number;
  processingAgents: number;
  idleAgents: number;
  vpsStatus: string;
  uptimePercentage: string;
  lastSyncTimestamp: string;
  departments: DepartmentTelemetrySpec[];
}

// Lista oficial e imutável dos 19 Agentes alocados nos 8 Departamentos
export const FLEET_AGENTS_DEFINITION = [
  // 01. Diretoria Executiva
  {
    id: 'agent_01',
    name: 'Maestro Lincoln',
    role: 'Orquestrador Executivo & Supervisor AGY',
    departmentId: '01_DIRETORIA',
    departmentCode: '01',
    departmentName: 'Diretoria Executiva & Estratégia',
    kpiHighlight: 'Supervisão Global 24/7 de 19 Agentes'
  },
  {
    id: 'agent_02',
    name: 'Armando (Genera / Decisor)',
    role: 'Representação de Crivo e Decisão Soberana',
    departmentId: '01_DIRETORIA',
    departmentCode: '01',
    departmentName: 'Diretoria Executiva & Estratégia',
    kpiHighlight: 'Aprovação Final e Crivo Estético'
  },

  // 02. Jurídico & Compliance
  {
    id: 'agent_03',
    name: 'Dr. Lex (JusChat)',
    role: 'Compliance Jurídico & Marcas INPI',
    departmentId: '02_JURIDICO',
    departmentCode: '02',
    departmentName: 'Jurídico, Fiscal & Compliance',
    kpiHighlight: 'INPI Processo 944841171 Monitorado'
  },
  {
    id: 'agent_04',
    name: 'Tax & Fiscal Bot',
    role: 'Simples Nacional & DAS Fiscal Auditor',
    departmentId: '02_JURIDICO',
    departmentCode: '02',
    departmentName: 'Jurídico, Fiscal & Compliance',
    kpiHighlight: 'Compliance Fiscal JUCEES / RFB'
  },

  // 03. Engenharia de Software
  {
    id: 'agent_05',
    name: 'Inspetor de Códigos',
    role: 'Auditor de Segurança & TypeScript Quality',
    departmentId: '03_ENGENHARIA',
    departmentCode: '03',
    departmentName: 'Engenharia de Software & TI',
    kpiHighlight: 'Build Next.js 15 100% Estável'
  },
  {
    id: 'agent_06',
    name: 'Software Architect',
    role: 'Arquiteto de Sistemas & Prisma ORM',
    departmentId: '03_ENGENHARIA',
    departmentCode: '03',
    departmentName: 'Engenharia de Software & TI',
    kpiHighlight: 'Postgres & Migrações Sincronizadas'
  },
  {
    id: 'agent_07',
    name: 'Backend Architect',
    role: 'Infraestrutura VPS Contabo & Rotas GEO',
    departmentId: '03_ENGENHARIA',
    departmentCode: '03',
    departmentName: 'Engenharia de Software & TI',
    kpiHighlight: 'Indexação GEO AI (/llms.txt) OK'
  },

  // 04. Operações & PoD
  {
    id: 'agent_08',
    name: 'PoD Dispatch Agent',
    role: 'Despachante de Pedidos Reserva INK / Dimona',
    departmentId: '04_OPERACOES',
    departmentCode: '04',
    departmentName: 'Operações & Logística PoD',
    kpiHighlight: 'SLA de Produção 48h Auditado'
  },
  {
    id: 'agent_09',
    name: 'Logistics Tracker',
    role: 'Rastreamento de Entregas & Melhor Envio',
    departmentId: '04_OPERACOES',
    departmentCode: '04',
    departmentName: 'Operações & Logística PoD',
    kpiHighlight: 'Integridade de Embalagem Ziplock'
  },

  // 05. SAC & Discriminador
  {
    id: 'agent_10',
    name: 'Agente Discriminador',
    role: 'Triagem de Ocorrências & Matriz de Defeitos',
    departmentId: '05_SAC',
    departmentCode: '05',
    departmentName: 'SAC, Pós-Venda & Discriminador',
    kpiHighlight: 'Portal /trocas com 0 Pendências'
  },
  {
    id: 'agent_11',
    name: 'Concierge IA 24/7',
    role: 'Atendimento Humanizado WhatsApp & Web',
    departmentId: '05_SAC',
    departmentCode: '05',
    departmentName: 'SAC, Pós-Venda & Discriminador',
    kpiHighlight: 'Atendimento em Tempo Real Ativo'
  },

  // 06. Marketing & Growth
  {
    id: 'agent_12',
    name: 'Traffic Manager',
    role: 'Gestor de Tráfego Pago Meta Ads R$ 15/dia',
    departmentId: '06_MARKETING',
    departmentCode: '06',
    departmentName: 'Marketing, Growth & Mídias',
    kpiHighlight: 'Estratégia Dual-Store & ROAS'
  },
  {
    id: 'agent_13',
    name: 'Feed & Visual Curator',
    role: 'Curadoria Estética 9:16 & Sacolinha IG',
    departmentId: '06_MARKETING',
    departmentCode: '06',
    departmentName: 'Marketing, Growth & Mídias',
    kpiHighlight: 'Feed Instagram Sincronizado'
  },
  {
    id: 'agent_14',
    name: 'Content Creator',
    role: 'Copywriting & Narrativas dos Drops',
    departmentId: '06_MARKETING',
    departmentCode: '06',
    departmentName: 'Marketing, Growth & Mídias',
    kpiHighlight: 'Copies Autorais Drop 01 Prontas'
  },

  // 07. Atelier de Artes
  {
    id: 'agent_15',
    name: 'ASK Nexus',
    role: 'Pesquisador de Conceitos Estética da Subtração',
    departmentId: '07_ATELIER',
    departmentCode: '07',
    departmentName: 'Atelier de Artes & Prompts',
    kpiHighlight: 'Conceituação de Prompts A3'
  },
  {
    id: 'agent_16',
    name: 'PLAN Narrative',
    role: 'Estruturador de Prompts JSON & Specs',
    departmentId: '07_ATELIER',
    departmentCode: '07',
    departmentName: 'Atelier de Artes & Prompts',
    kpiHighlight: 'Engenharia de Prompt DTG HD'
  },
  {
    id: 'agent_17',
    name: 'Artwork Architect',
    role: 'Gerador de Matrizes 300 DPI 4200x4800px',
    departmentId: '07_ATELIER',
    departmentCode: '07',
    departmentName: 'Atelier de Artes & Prompts',
    kpiHighlight: '12 Artes Matrizes Prontas'
  },

  // 08. Financeiro & Contábil
  {
    id: 'agent_18',
    name: 'CFO Virtual & FP&A',
    role: 'DRE Gerencial, Projeção de Caixa & Bling',
    departmentId: '08_FINANCEIRO',
    departmentCode: '08',
    departmentName: 'Financeiro, Contabilidade & Unit Econ.',
    kpiHighlight: 'Margem Bruta 67.7% Garantida'
  },
  {
    id: 'agent_19',
    name: 'Financial Reconciler',
    role: 'Conciliação Pix D+0 & Repasses Cartão',
    departmentId: '08_FINANCEIRO',
    departmentCode: '08',
    departmentName: 'Financeiro, Contabilidade & Unit Econ.',
    kpiHighlight: 'Extrato Bancário PJ Auditado'
  },
  {
    id: 'agent_20',
    name: 'Unit Economics Engineer',
    role: 'Precificação Dinâmica & Breakeven ROAS',
    departmentId: '08_FINANCEIRO',
    departmentCode: '08',
    departmentName: 'Financeiro, Contabilidade & Unit Econ.',
    kpiHighlight: 'Lucro R$ 122,00 / Peça Calculado'
  }
];

/**
 * Função utilitária que simula e calcula a telemetria ao vivo da frota de 19 agentes
 */
export async function getAgentFleetTelemetry(): Promise<AgentFleetOverview> {
  const now = new Date().toISOString();

  const departmentCodes = ['01', '02', '03', '04', '05', '06', '07', '08'];
  
  const mappedAgents: AgentTelemetrySpec[] = FLEET_AGENTS_DEFINITION.map((agent, index) => {
    // Determina status dinâmico para demonstração telemétrica
    const isOnline = true;
    const isProcessing = index % 3 === 0;
    
    return {
      id: agent.id,
      name: agent.name,
      role: agent.role,
      departmentId: agent.departmentId,
      departmentCode: agent.departmentCode,
      departmentName: agent.departmentName,
      status: isProcessing ? 'processing' : isOnline ? 'online' : 'idle',
      lastRun: new Date(Date.now() - (index * 120000)).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      kpiHighlight: agent.kpiHighlight,
      activeTaskCount: isProcessing ? 2 : 1,
      recentLogs: [
        `[${now.slice(11, 16)}] Execução de rotina agendada para ${agent.departmentName}`,
        `[${now.slice(11, 16)}] Validação de parâmetros de governança OK`
      ]
    };
  });

  const departmentTelemetries: DepartmentTelemetrySpec[] = departmentCodes.map((code) => {
    const deptAgents = mappedAgents.filter((a) => a.departmentCode === code);
    const deptName = deptAgents[0]?.departmentName || `Departamento ${code}`;
    const deptId = deptAgents[0]?.departmentId || `DEPT_${code}`;

    return {
      code,
      id: deptId,
      name: deptName,
      agents: deptAgents,
      departmentStatus: 'operational',
      activeAgentsCount: deptAgents.length
    };
  });

  return {
    totalAgents: mappedAgents.length,
    onlineAgents: mappedAgents.filter((a) => a.status === 'online' || a.status === 'processing').length,
    processingAgents: mappedAgents.filter((a) => a.status === 'processing').length,
    idleAgents: mappedAgents.filter((a) => a.status === 'idle').length,
    vpsStatus: 'ONLINE (VPS Contabo)',
    uptimePercentage: '99.9%',
    lastSyncTimestamp: now,
    departments: departmentTelemetries
  };
}
