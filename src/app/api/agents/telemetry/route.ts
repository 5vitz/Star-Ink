import { NextResponse } from 'next/server';
import { getAgentFleetTelemetry } from '@/lib/agents/telemetry';

export async function GET() {
  try {
    const telemetry = await getAgentFleetTelemetry();
    return NextResponse.json(telemetry, { status: 200 });
  } catch (error) {
    console.error('Erro ao consultar telemetria dos agentes:', error);
    return NextResponse.json(
      { error: 'Falha ao recuperar telemetria da frota agêntica' },
      { status: 500 }
    );
  }
}
