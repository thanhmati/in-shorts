#!/usr/bin/env python3
"""
TTS & Word-level Captions Generator for Remotion Shorts.
Includes Smart Phonetic Engine for Vietnamese IT/Tech pronunciation.
- Pronounces technical English terms in natural Vietnamese dev style.
- Preserves clean original English code syntax on subtitles and visual layers.
"""

import sys
import os
import re
import argparse
import asyncio
import json
import edge_tts

# Comprehensive dictionary for English IT/Tech terms pronounced in Vietnamese dev style
TECH_PHONETICS = {
    "react": "Ri-ét",
    "usecallback": "diu-con-bách",
    "usememo": "diu-mê-mô",
    "usestate": "diu-xờ-tết",
    "useeffect": "diu-ép-phếch",
    "useref": "diu-rét",
    "usecontext": "diu-con-tếch",
    "usereducer": "diu-ri-điu-sơ",
    "component": "com-pâu-nần",
    "components": "com-pâu-nần",
    "re-render": "ri-ren-đơ",
    "rerender": "ri-ren-đơ",
    "render": "ren-đơ",
    "inline": "in-lai",
    "function": "phăng-sừn",
    "functions": "phăng-sừn",
    "object": "ọp-chếch",
    "objects": "ọp-chếch",
    "array": "ơ-rây",
    "string": "xờ-tring",
    "number": "năm-bơ",
    "boolean": "bu-li-ừn",
    "props": "próp",
    "hook": "húc",
    "hooks": "húc",
    "javascript": "gia-va-sờ-cờ-ríp",
    "typescript": "típ-sờ-cờ-ríp",
    "nodejs": "nốt-dây-ét",
    "node": "nốt",
    "docker": "đốc-cơ",
    "container": "cơn-tei-nơ",
    "containers": "cơn-tei-nơ",
    "microservices": "mai-cro-sơ-vít",
    "microservice": "mai-cro-sơ-vít",
    "backend": "bách-en",
    "frontend": "phron-ten",
    "fullstack": "phun-xờ-tách",
    "database": "đa-ta-bây",
    "redis": "rê-đít",
    "kafka": "cáp-ca",
    "api": "ây-pi-ai",
    "apis": "ây-pi-ai",
    "rest": "rét",
    "graphql": "gờ-rap-qui-eo",
    "jwt": "di-đắp-lưu-ti",
    "oauth": "ô-ót",
    "promise": "prô-mít",
    "async": "ây-xinh",
    "await": "ơ-uây",
    "satisfies": "sa-tis-phai",
    "github": "gít-hắp",
    "git": "gít",
    "commit": "côm-mít",
    "merge": "mợt",
    "rebase": "ri-bây",
    "branch": "bờ-ranh",
    "terminal": "tơ-mi-nồ",
    "cache": "cát",
    "caching": "cát-xinh",
    "cookie": "cúc-ki",
    "session": "xét-sừn",
    "token": "tô-kừn",
    "bug": "bắc",
    "bugs": "bắc",
    "debug": "đi-bắc",
    "clean": "clin",
    "code": "cốt",
    "coding": "cốt-đinh",
    "server": "xơ-vơ",
    "client": "cơ-lai-ừn",
    "load": "lốt",
    "balancer": "ba-lân-xơ",
    "queue": "kiu",
    "event": "i-ven",
    "loop": "lúp",
    "call": "con",
    "back": "bách",
    "memo": "mê-mô",
}

def transform_phonetics(original_text: str):
    """
    Transforms tech terms into phonetic spellings for speech,
    while returning matching original display words for subtitles.
    """
    tokens = original_text.split()
    spoken_tokens = []
    display_tokens = []

    for tok in tokens:
        # Separate leading/trailing punctuation
        match = re.match(r"^([^\w\-]*)([\w\-]+)([^\w\-]*)$", tok)
        if match:
            prefix, core, suffix = match.groups()
            core_lower = core.lower()

            if core_lower in TECH_PHONETICS:
                phonetic = TECH_PHONETICS[core_lower]
                spoken_tokens.append(f"{prefix}{phonetic}{suffix}")
            else:
                spoken_tokens.append(tok)
            display_tokens.append(tok)
        else:
            spoken_tokens.append(tok)
            display_tokens.append(tok)

    spoken_text = " ".join(spoken_tokens)
    return spoken_text, display_tokens

async def generate(text: str, voice: str, rate: str, fps: int, audio_path: str, json_path: str):
    os.makedirs(os.path.dirname(os.path.abspath(audio_path)), exist_ok=True)
    os.makedirs(os.path.dirname(os.path.abspath(json_path)), exist_ok=True)

    spoken_text, display_tokens = transform_phonetics(text)
    print(f"Original Text: {text}")
    print(f"Spoken Text (Phonetic Engine): {spoken_text}")

    max_retries = 3
    words = []
    audio_data = bytearray()

    for attempt in range(1, max_retries + 1):
        try:
            words = []
            audio_data = bytearray()
            word_index = 0

            communicate = edge_tts.Communicate(
                text=spoken_text,
                voice=voice,
                rate=rate,
                boundary="WordBoundary"
            )

            async for chunk in communicate.stream():
                if chunk["type"] == "audio":
                    audio_data.extend(chunk["data"])
                elif chunk["type"] == "WordBoundary":
                    offset_ticks = chunk["offset"]
                    duration_ticks = chunk["duration"]

                    start_sec = offset_ticks / 10_000_000.0
                    end_sec = (offset_ticks + duration_ticks) / 10_000_000.0

                    start_frame = int(round(start_sec * fps))
                    end_frame = int(round(end_sec * fps))
                    if end_frame <= start_frame:
                        end_frame = start_frame + 1

                    # Restore original clean display word (e.g. React instead of Ri-ét)
                    if word_index < len(display_tokens):
                        display_word = display_tokens[word_index]
                    else:
                        display_word = chunk["text"]

                    words.append({
                        "word": display_word,
                        "spoken": chunk["text"],
                        "startSec": round(start_sec, 3),
                        "endSec": round(end_sec, 3),
                        "startFrame": start_frame,
                        "endFrame": end_frame,
                    })
                    word_index += 1

            if words and len(audio_data) > 0:
                break
        except Exception as err:
            print(f"Attempt {attempt}/{max_retries} failed ({err}). Retrying in 1.5s...")
            await asyncio.sleep(1.5)
            if attempt == max_retries:
                raise

    # Save audio file
    with open(audio_path, "wb") as f:
        f.write(audio_data)

    last_end_frame = words[-1]["endFrame"] if words else 0
    # Add 1.5 second buffer at end for smooth outro
    total_frames = last_end_frame + int(round(1.5 * fps))
    total_sec = total_frames / float(fps)

    output_payload = {
        "text": text,
        "spokenText": spoken_text,
        "voice": voice,
        "rate": rate,
        "fps": fps,
        "durationInFrames": total_frames,
        "durationInSeconds": round(total_sec, 2),
        "words": words,
    }

    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(output_payload, f, ensure_ascii=False, indent=2)

    print(f"SUCCESS: Audio written to {audio_path}")
    print(f"SUCCESS: Subtitles written to {json_path}")
    print(f"Total Duration: {round(total_sec, 2)}s ({total_frames} frames @ {fps}fps)")

def main():
    parser = argparse.ArgumentParser(description="Generate TTS with Smart Phonetic Engine for Remotion")
    parser.add_argument("--text", type=str, help="Text to speak")
    parser.add_argument("--file", type=str, help="Text file to read")
    parser.add_argument("--voice", type=str, default="vi-VN-NamMinhNeural", help="Voice name")
    parser.add_argument("--rate", type=str, default="+10%", help="Speed adjustment (+10% for Shorts)")
    parser.add_argument("--fps", type=int, default=30, help="Frames per second")
    parser.add_argument("--output-audio", type=str, required=True, help="Path to output mp3")
    parser.add_argument("--output-json", type=str, required=True, help="Path to output json")

    args = parser.parse_args()

    if args.file:
        with open(args.file, "r", encoding="utf-8") as f:
            text = f.read().strip()
    elif args.text:
        text = args.text.strip()
    else:
        print("Error: Either --text or --file is required", file=sys.stderr)
        sys.exit(1)

    asyncio.run(generate(
        text=text,
        voice=args.voice,
        rate=args.rate,
        fps=args.fps,
        audio_path=args.output_audio,
        json_path=args.output_json
    ))

if __name__ == "__main__":
    main()
