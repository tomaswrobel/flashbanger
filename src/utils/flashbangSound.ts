export function flashbangSound(seconds: number) {
	return new Promise<void>(resolve => {
		const audioContext = new AudioContext();
		const gainNode = audioContext.createGain();
		const oscillator = audioContext.createOscillator();

		oscillator.addEventListener("ended", () => resolve());

		oscillator.type = "triangle";
		oscillator.frequency.value = 6000;
		gainNode.gain.value = 0;

		oscillator.connect(gainNode);
		gainNode.connect(audioContext.destination);
		oscillator.start(audioContext.currentTime);
		gainNode.gain.exponentialRampToValueAtTime(
			0.5,
			audioContext.currentTime + 0.05
		);
		gainNode.gain.exponentialRampToValueAtTime(
			0.0001,
			audioContext.currentTime + seconds
		);

		oscillator.stop(audioContext.currentTime + seconds + 0.1);
	});
}
