import type { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  index: number;
}

const ServiceCard = ({ title, description, Icon, index }: ServiceCardProps) => {
  return (
    <div className="group relative bg-white border border-gray-100 p-8 lg:p-10 hover:bg-navy transition-all duration-500 overflow-hidden">
      {/* Index Number */}
      <span className="absolute top-6 right-6 text-[72px] font-heading font-extrabold text-gray-100 group-hover:text-white/5 leading-none transition-colors duration-500 select-none">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Gold accent line */}
      <div className="absolute top-0 left-0 w-0 h-[3px] bg-gold group-hover:w-full transition-all duration-500"></div>

      <div className="relative z-10">
        <div className="w-12 h-12 flex items-center justify-center mb-6">
          <Icon className="w-7 h-7 text-navy group-hover:text-gold transition-colors duration-500" />
        </div>

        <h3 className="text-lg font-heading font-bold text-navy group-hover:text-white mb-3 transition-colors duration-500">
          {title}
        </h3>

        <p className="text-sm text-gray-500 group-hover:text-white/60 leading-relaxed transition-colors duration-500">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
