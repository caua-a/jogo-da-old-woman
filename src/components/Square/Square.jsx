
import styles from "./Square.module.css";

function Square({ value, onClick, disabled }) {
    return (
        <button
            onClick={onClick}
            className={styles.botao}
            type="button"
            disabled={disabled || value !== null}
        >
            {value}
        </button>
    );
}

export default Square;

