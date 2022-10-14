import { useEffect, useState } from 'react';
import './index.css'

function getCurrentAngleAndRemainingTime(futureTime: number, setTime: number): { angle: number, remainingTime: number } {
    const currentTime = Date.now();
    const remainingTime = futureTime - currentTime;
    if (remainingTime >= 0) {
        const angle = (remainingTime / setTime) * 360
        return { angle, remainingTime: Math.floor((remainingTime / 1000) % 60) };
    }
    return { angle: 0, remainingTime: 0 }
}

export const CircleTimer = ({ sec }: { sec: number }) => {
    const [angle, setAngle] = useState(0);
    const [remainingTime, setRemainingTime] = useState(sec);
    useEffect(() => {
        const setTime = sec * 1000
        const startTime = Date.now();
        const futureTime = startTime + setTime;
        const timerLoop = setInterval(() => {
            const { angle, remainingTime } = getCurrentAngleAndRemainingTime(futureTime, setTime);
            setAngle(angle);
            setRemainingTime(remainingTime);
            if (!angle) {
                clearInterval(timerLoop)
            }
        });
        getCurrentAngleAndRemainingTime(futureTime, setTime);
        return () => clearInterval(timerLoop);
    }, [])

    return (
        <div className="countdown-container">
            <div className="circle-container">
                ${angle > 180 && <div className="semi-circle semi-circle-1"></div>}
                <div className="semi-circle semi-circle-2" style={{ transform: `${angle !== 0 ? `rotate(${angle}deg)` : 'none'}` }}></div>
                <div className="outermost-circle"></div>
            </div>
            {angle <= 180 && <div className="overlay"></div>}
            <div className='remaining-time'>{remainingTime}</div>
        </div>
    )


}

export default CircleTimer;