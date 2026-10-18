#!/usr/bin/env python3
"""
Procedural Sound Effects (SFX) Generator for Remotion.
Synthesizes clean, high-quality .wav sound effects using standard Python (no dependencies).
Generates:
  - public/sfx/pop.wav (Snappy UI pop)
  - public/sfx/ding.wav (Sparkling success chime)
  - public/sfx/whoosh.wav (Dynamic transition swoosh)
"""

import os
import wave
import struct
import math
import random

SAMPLE_RATE = 44100

def create_pop(filepath: str):
    duration = 0.08 # 80ms
    num_samples = int(SAMPLE_RATE * duration)
    with wave.open(filepath, "w") as wav:
        wav.setnchannels(1)
        wav.setsampwidth(2)
        wav.setframerate(SAMPLE_RATE)
        for i in range(num_samples):
            t = i / SAMPLE_RATE
            progress = i / num_samples
            # Frequency drops rapidly from 650Hz to 150Hz
            freq = 650 * (1 - progress * 0.8)
            env = math.exp(-progress * 9) # Fast decay
            sample = math.sin(2 * math.pi * freq * t) * env
            packed = struct.pack("<h", int(sample * 30000))
            wav.writeframes(packed)
    print(f"Generated: {filepath}")

def create_ding(filepath: str):
    duration = 0.7 # 700ms
    num_samples = int(SAMPLE_RATE * duration)
    with wave.open(filepath, "w") as wav:
        wav.setnchannels(1)
        wav.setsampwidth(2)
        wav.setframerate(SAMPLE_RATE)
        for i in range(num_samples):
            t = i / SAMPLE_RATE
            progress = i / num_samples
            # Harmonious dual chime: 1046.5Hz (C6) and 2093Hz (C7) + 2637Hz (E7)
            s1 = math.sin(2 * math.pi * 1046.5 * t)
            s2 = math.sin(2 * math.pi * 2093.0 * t) * 0.5
            s3 = math.sin(2 * math.pi * 2637.0 * t) * 0.3
            env = math.exp(-progress * 5.5) # Ringing decay
            sample = (s1 + s2 + s3) * env * 0.55
            packed = struct.pack("<h", int(sample * 30000))
            wav.writeframes(packed)
    print(f"Generated: {filepath}")

def create_whoosh(filepath: str):
    duration = 0.28 # 280ms
    num_samples = int(SAMPLE_RATE * duration)
    with wave.open(filepath, "w") as wav:
        wav.setnchannels(1)
        wav.setsampwidth(2)
        wav.setframerate(SAMPLE_RATE)
        for i in range(num_samples):
            t = i / SAMPLE_RATE
            progress = i / num_samples
            # Smooth bell-shaped envelope
            env = math.sin(math.pi * progress) ** 2
            # Frequency sweep upward then downward
            freq = 200 + 700 * math.sin(math.pi * progress)
            # Add subtle pink noise
            noise = (random.random() * 2 - 1) * 0.35
            sample = (math.sin(2 * math.pi * freq * t) * 0.65 + noise) * env
            packed = struct.pack("<h", int(sample * 28000))
            wav.writeframes(packed)
    print(f"Generated: {filepath}")

def main():
    sfx_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "sfx")
    os.makedirs(sfx_dir, exist_ok=True)
    create_pop(os.path.join(sfx_dir, "pop.wav"))
    create_ding(os.path.join(sfx_dir, "ding.wav"))
    create_whoosh(os.path.join(sfx_dir, "whoosh.wav"))

if __name__ == "__main__":
    main()
