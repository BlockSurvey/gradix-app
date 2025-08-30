import React, { InputHTMLAttributes } from 'react';
import styles from '../../../styles/ui-controls/Input.module.scss';

export type ToggleProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    labelClassName?: string;
};

const CLToggle: React.FC<ToggleProps> = ({ label, labelClassName, ...props }) => {
    return (
        <div className={styles.toggleContainer}>
            <input type="checkbox" className={styles.toggleInput} {...props} />
            <label htmlFor={props.id} className={styles.toggleLabel}>
                {/* {label} */}
            </label>
        </div>
    );
};

export default CLToggle;
