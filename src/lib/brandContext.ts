import brandDna from '@/config/brand_dna.json';
import operationalSpec from '@/config/operational_spec.json';
import financialGovernanceSpec from '@/config/financial_governance_spec.json';

export interface BrandContext {
  brandDna: typeof brandDna;
  operationalSpec: typeof operationalSpec;
  financialGovernanceSpec: typeof financialGovernanceSpec;
}

/**
 * Retorna o contexto unificado dos 3 Níveis da Informação Proprietária da Star INK:
 * Nível 1: Tônica (Nível Espiritual & Identidade da Marca)
 * Nível 2: Terça (Nível Operacional, Produção PoD & Catálogos)
 * Nível 3: Quinta (Nível Financeiro, Fiscal & Governança)
 */
export function getFullBrandContext(): BrandContext {
  return {
    brandDna,
    operationalSpec,
    financialGovernanceSpec,
  };
}

/**
 * Retorna uma síntese formatada para injeção em System Prompts dos Agentes de IA.
 */
export function getFormattedPromptContext(department?: string): string {
  const { brand_identity, tonica_espiritual } = brandDna;
  const { suppliers, logistics_hub } = operationalSpec.operational_level;
  const { company_legal_data, sovereignty_governance_rules } = financialGovernanceSpec.financial_and_governance_level;

  let prompt = `=== MARCA & NÚCLEO ESPIRITUAL (TÔNICA) ===
Nome Oficial: ${brand_identity.legal_name} (${brand_identity.trade_name})
Filosofia: ${brand_identity.core_philosophy.motto}
Identidade Pública do Atendimento: ${tonica_espiritual.assistente_ia_principles.public_identity}
Política de Transparência: ${tonica_espiritual.assistente_ia_principles.transparency_policy}
Tom de Voz: ${tonica_espiritual.assistente_ia_principles.tone}
Diretriz de Qualidade: ${tonica_espiritual.material_quality_manifesto.philosophy}

=== GOVERNANÇA & SOBERANIA (QUINTA) ===
Empresa: ${company_legal_data.legal_name} - CNPJ: ${company_legal_data.cnpj} (${company_legal_data.cnpj_status})
Deploy & Produção: ${sovereignty_governance_rules.founder_exclusive_deploy}
Decisão Executiva: ${sovereignty_governance_rules.human_in_the_loop_requirement}
`;

  if (department === 'sac' || department === 'operacoes') {
    prompt += `
=== OPERAÇÃO & POD (TERÇA) ===
Fornecedor Principal: ${suppliers.reserva_ink.name} (${suppliers.reserva_ink.role})
SLA Produção: ${suppliers.reserva_ink.sla_production_days}
Portal de Trocas: ${logistics_hub.reverse_logistics_portal}
Garantia de Fábrica: ${suppliers.reserva_ink.guarantee_policy}
`;
  }

  return prompt;
}
