
export function formatTime(time: number) {
    time = Math.floor(time);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes}:${String(seconds).padStart(2, '0')}`;
}
