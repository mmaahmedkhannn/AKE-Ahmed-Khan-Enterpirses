import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import type { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const statusColors = {
    Completed: 'bg-emerald-500',
    Ongoing: 'bg-blue-500',
    Upcoming: 'bg-amber-500',
  };

  return (
    <Link
      to={`/projects/${project.id}`}
      className="group relative block h-[420px] overflow-hidden bg-navy cursor-pointer"
    >
      {/* Background Image */}
      <img
        src={project.images[0] || 'https://via.placeholder.com/800x600?text=No+Image'}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

      {/* Gold top-right accent line */}
      <div className="absolute top-0 right-0 w-20 h-[3px] bg-gold transform origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
      <div className="absolute top-0 right-0 w-[3px] h-20 bg-gold transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 delay-100"></div>

      {/* Status Badge */}
      <div className="absolute top-6 left-6">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${statusColors[project.status]}`}></div>
          <span className="text-white/80 text-[11px] font-semibold uppercase tracking-[0.2em]">
            {project.status}
          </span>
        </div>
      </div>

      {/* Content at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-7">
        <div className="flex items-center text-white/60 text-xs mb-3 space-x-1">
          <MapPin className="w-3 h-3" />
          <span>{project.location}</span>
        </div>

        <h3 className="text-white text-xl font-heading font-bold mb-2 leading-tight group-hover:text-gold transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">
          {project.shortDescription}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-gold/60 text-[10px] uppercase tracking-[0.2em] font-semibold">
            {project.category}
          </span>
          <span className="flex items-center text-gold text-xs font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            View
            <ArrowRight className="w-3 h-3 ml-1" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
