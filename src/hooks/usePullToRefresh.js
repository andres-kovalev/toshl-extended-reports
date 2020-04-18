import { useRef, useEffect } from 'react';
import { useSpring } from 'react-spring';

export default function usePullToRefresh(refresh, pullLength = 100) {
    const ref = useRef();
    const [ props, setProps ] = useSpring(() => ({ overpull: 0 }));

    useEffect(() => {
        const container = ref.current;
        let scroll = null;

        const handleTouchMove = ({ touches }) => {
            const y = touches[0].pageY;

            if (container.scrollTop === 0) {
                if (scroll === null) {
                    scroll = y;
                }

                const overpull = y - scroll;

                setProps({ overpull });

                if (refresh && overpull >= pullLength) {
                    refresh();
                }
            }
        };
        const handleTouchEnd = () => {
            scroll = null;
            setProps({ overpull: 0 });
        };

        container.addEventListener('touchmove', handleTouchMove, { passive: true });
        container.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            container.removeEventListener('touchmove', handleTouchMove);
            container.removeEventListener('touchend', handleTouchEnd);
        };
    }, [ pullLength, refresh, setProps ]);

    return [
        ref,
        props.overpull.interpolate({
            range: [ 0, pullLength ],
            output: [ 0, 100 ],
            extrapolate: 'clamp'
        })
    ];
}
