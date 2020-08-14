import { useRef, useEffect } from 'react';
import { useSpring } from 'react-spring';

export default function usePullToRefresh(refresh, loading, pullLength = 100) {
    const ref = useRef();
    const [ props, setProps ] = useSpring(() => ({ overpull: 0 }));
    const reset = () => setProps({ overpull: 0 });

    useEffect(() => {
        if (loading) {
            return () => {};
        }

        const container = ref.current;
        let scroll = null;

        const handleTouchMove = (event) => {
            const { touches } = event;
            const y = touches[0].pageY;

            if (container.scrollTop === 0) {
                if (scroll === null) {
                    scroll = y;
                }

                const overpull = y - scroll;
                if (overpull > 0) {
                    event.preventDefault();
                }

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

        container.addEventListener('touchmove', handleTouchMove, { passive: false });
        container.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            container.removeEventListener('touchmove', handleTouchMove);
            container.removeEventListener('touchend', handleTouchEnd);
        };
    }, [ loading, pullLength, refresh, setProps ]);

    return [
        ref,
        props.overpull.interpolate({
            range: [ 0, pullLength ],
            output: [ 0, 100 ],
            extrapolate: 'clamp'
        }),
        reset
    ];
}
