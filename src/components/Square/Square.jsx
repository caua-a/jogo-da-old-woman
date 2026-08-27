import styles from "./Square.module.css";

function Square({ value, onClick }) {
  return (
    <button 
      onClick={onClick} 
      className={styles.botao} 
      type="submit"
    >
      {value}
    </button>
  );
}

export default Square;