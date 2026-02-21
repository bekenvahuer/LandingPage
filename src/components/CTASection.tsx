import agendaImg from "../assets/agenda.png";

interface CTASectionProps {
  onBookNow: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onBookNow }) => {
  return (
    <section className="cta-section">
      <button className="btn-primary" onClick={onBookNow}>
        <img src={agendaImg} alt="Agendar cita" />
      </button>
      <h2>Ribot es hecho 100% en Medellin</h2>
    </section>
  );
};

export default CTASection;