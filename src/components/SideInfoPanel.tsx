import { HiOutlineBookOpen } from 'react-icons/hi';
import FeatureCard from './FeatureCard';
import { HiOutlineClipboardDocumentList, HiOutlineChartBar } from 'react-icons/hi2';

export default function SideInfoPanel() {
  return (
    <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-blue-700 p-8 text-white min-w-[320px]">
      <div className="w-full max-w-md flex flex-col items-start justify-center">
        <div className="flex items-center mb-6">
          <span className="bg-white bg-opacity-20 rounded-full p-3 mr-3">
            <HiOutlineBookOpen className="w-9 h-9" color="#3562de" />
          </span>
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Projeto Integrador Univesp</h2>
            <p className="text-sm font-normal opacity-90">Plataforma de Ensino Digital</p>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-3 text-white text-left w-full leading-tight tracking-tight">Acompanhe sua jornada acadêmica</h1>
        <p className="mb-8 opacity-90 text-base w-full text-left font-normal">Gerencie suas atividades, acompanhe seu progresso e mantenha-se organizado em sua rotina de estudos na plataforma digital.</p>
        <div className="space-y-4 w-full">
          <FeatureCard
            icon={<HiOutlineClipboardDocumentList className="w-7 h-7 text-blue-200" />}
            title="Atividades Organizadas"
            description="Visualize e gerencie todas as suas tarefas acadêmicas"
          />
          <FeatureCard
            icon={<HiOutlineChartBar className="w-7 h-7 text-blue-200" />}
            title="Acompanhe seu Progresso"
            description="Monitore seu desempenho com gráficos e métricas"
          />
        </div>
      </div>
    </div>
  );
}
