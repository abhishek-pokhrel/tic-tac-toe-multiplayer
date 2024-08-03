import React, { useEffect, useState } from 'react';
import './Alert.css';

function Alert({ message, level, time=1000 }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, time); // Adjust the time (in milliseconds) for how long the alert should be visible

        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    const getAlertClass = () => {
        switch (level) {
            case 1:
                return 'alert-success';
            case 2:
                return 'alert-info';
            case 4:
                return 'alert-warning';
            case 5:
                return 'alert-danger';
            default:
                return '';
        }
    };

    return (
        <div className={`alert ${getAlertClass()}`}>
            {message}
        </div>
    );
}

export default Alert;
