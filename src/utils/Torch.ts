class Torch {
	private stream?: MediaStream;

	async enable(options?: Torch.Options) {
		const available = this.isAvailable();
		if (!available) {
			return;
		}
		const enabled = this.isEnabled(options);
		if (enabled) {
			return;
		}
		const stream = options?.stream ?? this.stream;
		if (stream) {
			const [videoTrack] = stream.getVideoTracks();
			await videoTrack.applyConstraints({
				torch: true,
			});
		} else {
			this.stream = await navigator.mediaDevices.getUserMedia({
				audio: false,
				video: {
					facingMode: "environment",
					torch: true,
				},
			});
		}
	}

	async disable(options?: Torch.Options) {
		const available = this.isAvailable();
		if (!available) {
			return;
		}
		if (options?.stream) {
			const [videoTrack] = options.stream.getVideoTracks();
			await videoTrack.applyConstraints({
				torch: false,
			});
		} else {
			this.stream?.getTracks().forEach(track => track.stop());
			delete this.stream;
		}
	}

	isAvailable() {
		return "torch" in navigator.mediaDevices.getSupportedConstraints();
	}

	isEnabled(options?: Torch.Options) {
		const available = this.isAvailable();
		if (available) {
			const stream = options?.stream ?? this.stream;
			if (stream?.active) {
				const [videoTrack] = stream.getVideoTracks();
				return !!videoTrack.getSettings().torch;
			}
		}
		return false;
	}

	async toggle(options?: Torch.Options) {
		if (this.isEnabled(options)) {
			return this.disable(options);
		} else {
			return this.enable(options);
		}
	}

	constructor() {
		if (Torch.instance) {
			return Torch.instance;
		}
		Torch.instance = this;
	}

	private static instance?: Torch;
}

declare namespace Torch {
	type Options = { stream?: MediaStream } | null;
}

declare global {
	interface MediaTrackConstraints {
		torch?: boolean;
	}
}

export default Torch;
