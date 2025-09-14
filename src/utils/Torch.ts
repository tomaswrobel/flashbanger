class Torch {
	private stream?: MediaStream;
	private checkVideoInput = false;

	async enable(options?: Torch.Options) {
		if (!(await this.isAvailable()) || (await this.isEnabled(options))) {
			return;
		}
		const stream = options?.stream ?? this.stream;
		if (stream) {
			const [videoTrack] = stream.getVideoTracks();
			await videoTrack.applyConstraints({
				torch: true,
			});
		} else {
			try {
				this.stream = await navigator.mediaDevices.getUserMedia({
					audio: false,
					video: {
						facingMode: "environment",
						torch: true,
					},
				});
			} catch {
				this.checkVideoInput = true;
			}
		}
	}

	async disable(options?: Torch.Options) {
		if (!(await this.isAvailable())) {
			return;
		}
		if (options?.stream) {
			const [videoTrack] = options.stream.getVideoTracks();
			await videoTrack.applyConstraints({
				torch: false,
			});
		} else {
			this.stream?.getTracks().forEach(track => track.stop());
			this.stream = undefined;
		}
	}

	async isAvailable() {
		return (
			(!this.checkVideoInput ||
				(await navigator.mediaDevices.enumerateDevices()).some(
					d => d.kind === "videoinput" && d.deviceId
				)) &&
			"torch" in navigator.mediaDevices.getSupportedConstraints()
		);
	}

	async isEnabled(options?: Torch.Options) {
		if (await this.isAvailable()) {
			const stream = options?.stream ?? this.stream;
			if (stream?.active) {
				const [videoTrack] = stream.getVideoTracks();
				return !!videoTrack.getSettings().torch;
			}
		}
		return false;
	}

	async toggle(options?: Torch.Options) {
		if (await this.isEnabled(options)) {
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
