import agendaImg from "../assets/agenda.png";

const CTASection: React.FC = () => {
  return (
    <section className="cta-section">
      <button className="btn-primary">
        <img src={agendaImg} alt="Agendar cita" />
      </button>
      <h2>Ribot es hecho 100% en Medellin</h2>
    </section>
  );
};

export default CTASection;