#!/usr/bin/env python3
"""
TTS & Word-level Captions Generator for Remotion Shorts.
Engine: VieNeu-TTS (48kHz Neural Audio, On-device, Voice Cloning)
Includes Smart Phonetic Engine for Vietnamese IT/Tech pronunciation.
- Pronounces technical English terms in natural Vietnamese dev style.
- Preserves clean original English code syntax on subtitles and visual layers.
- Uses faster-whisper alignment layer for frame-accurate Remotion Kinetic Captions.
"""

import sys
import os

# Auto-reexec inside project .venv if available
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VENV_PYTHON = os.path.join(PROJECT_ROOT, ".venv", "bin", "python")
if os.path.exists(VENV_PYTHON) and sys.executable != VENV_PYTHON:
    os.execv(VENV_PYTHON, [VENV_PYTHON] + sys.argv)

import re
import argparse
import json
import subprocess
import tempfile
import difflib

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
    "nestjs": "nét-dây-ét",
    "nest": "nét",
    "prisma": "prít-ma",
    "postgresql": "pốt-grét-quy-en",
    "postgres": "pốt-grét",
    "websocket": "oép-sốc-két",
    "websockets": "oép-sốc-két",
    "socket": "sốc-két",
    "socketio": "sốc-két-ai-âu",
    "swagger": "xoa-gơ",
    "husky": "hấc-x-ki",
    "commitlint": "côm-mít-lin",
    "throttler": "tơ-rót-lơ",
    "middleware": "mít-đồ-ue",
    "middlewares": "mít-đồ-ue",
    "guard": "gạt",
    "guards": "gạt",
    "pipe": "paip",
    "pipes": "paip",
    "interceptor": "in-tơ-xép-tơ",
    "interceptors": "in-tơ-xép-tơ",
    "request": "ri-quét",
    "requests": "ri-quét",
    "response": "ri-xờ-pon",
    "responses": "ri-xờ-pon",
    "maintain": "men-tên",
    "lifecycle": "lai-xai-cồ",
    "route": "rao",
    "routes": "rao",
    "handler": "hen-đơ-lơ",
    "handlers": "hen-đơ-lơ",
    "authentication": "ót-then-ti-cây-sừn",
    "authorization": "ót-thơ-rai-zây-sừn",
    "logging": "lóc-ginh",
    "decorator": "đe-cô-rây-tơ",
    "decorators": "đe-cô-rây-tơ",
    "udemy": "du-đe-mi",
    "realtime": "ri-ờ-tam",
    "real-time": "ri-ờ-tam",
    "chat": "chát",
    "app": "áp",
    "apps": "áp",
    "enterprise": "en-tơ-prai",
    "bio": "bi-ô",
    "link": "linh",
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
    "callback": "con-bách",
    "callbacks": "con-bách",
    "stack": "xờ-tách",
    "microtask": "mai-cờ-rô-tác",
    "macrotask": "mác-cờ-rô-tác",
    "settimeout": "xét-tam-ao",
    "vip": "víp",
    "memo": "mê-mô",
    "foreach": "pho-ít",
    "for": "pho",
    "of": "ọp",
    "map": "mép",
    "all": "on",
    "save": "xêu",
    "savedb": "xêu-đi-bi",
    "db": "đi-bi",
    "user": "du-sơ",
    "users": "du-sơ",
    "item": "ai-từm",
    "items": "ai-từm",
    "login": "lo-gin",
    "bcrypt": "bi-críp",
    "query": "que-ri",
    "ratelimit": "rết li-mịt",
    "rate-limit": "rết li-mịt",
    "bruteforce": "bờ-rút phót",
    "brute-force": "bờ-rút phót",
    "console": "con-xôn",
    "log": "lóc",
    "done": "đơn",
    "follow": "phô-lâu",
    "typeof": "típ-ọp",
    "nan": "en-ây-en",
    "senior": "xi-ni-ơ",
    "junior": "du-ni-ơ",
    "true": "tru",
    "false": "phôn",
    "undefined": "ăn-đi-phai",
    "hoisting": "hoi-xờ-tinh",
    "var": "va",
    "quiz": "quít",
    "interview": "in-tơ-viu",
    "comment": "côm-mừn",
    "primitive": "pri-mi-típ",
}

def clean_word(w: str) -> str:
    return re.sub(r"[^\w]", "", w).lower()

def transform_phonetics(original_text: str):
    """
    Transforms tech terms into phonetic spellings for speech,
    while returning matching original display words for subtitles.
    """
    tokens = original_text.split()
    spoken_tokens = []
    display_tokens = []

    for tok in tokens:
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
            if re.search(r"[\w]", tok):
                display_tokens.append(tok)

    spoken_text = " ".join(spoken_tokens)
    return spoken_text, display_tokens

def convert_wav_to_mp3(wav_path: str, mp3_path: str):
    """Converts WAV to 48kHz high-bitrate MP3 using remotion ffmpeg."""
    cmd = [
        "npx", "remotion", "ffmpeg",
        "-y",
        "-i", wav_path,
        "-b:a", "192k",
        "-ar", "48000",
        mp3_path
    ]
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    if res.returncode != 0:
        raise RuntimeError(f"FFmpeg conversion failed: {res.stderr}")

def align_words_with_whisper(display_tokens, whisper_words, fps: int = 30):
    """
    Aligns original text display tokens with whisper word timestamps using difflib
    to ensure exact frame alignment for KineticCaptions without missing words.
    """
    if not display_tokens:
        return []

    if not whisper_words:
        step = 0.3
        res = []
        for i, tok in enumerate(display_tokens):
            s = i * step
            e = s + step
            sf = int(round(s * fps))
            ef = sf + max(int(round(step * fps)), 1)
            res.append({
                "word": tok,
                "spoken": tok,
                "startSec": round(s, 3),
                "endSec": round(e, 3),
                "startFrame": sf,
                "endFrame": ef
            })
        return res

    norm_display = [clean_word(t) for t in display_tokens]
    norm_whisp = [clean_word(w["word"]) for w in whisper_words]

    matcher = difflib.SequenceMatcher(None, norm_display, norm_whisp)
    opcodes = matcher.get_opcodes()

    token_times = [None] * len(display_tokens)

    for tag, i1, i2, j1, j2 in opcodes:
        if tag == "equal":
            for d_idx, w_idx in zip(range(i1, i2), range(j1, j2)):
                token_times[d_idx] = (whisper_words[w_idx]["start"], whisper_words[w_idx]["end"], whisper_words[w_idx]["word"])
        elif tag in ("replace", "delete"):
            prev_end = whisper_words[j1 - 1]["end"] if j1 > 0 else 0.0
            next_start = whisper_words[j2]["start"] if j2 < len(whisper_words) else (whisper_words[-1]["end"] if whisper_words else prev_end + 1.0)
            span = max(next_start - prev_end, 0.1 * (i2 - i1))
            slot_duration = span / max(i2 - i1, 1)

            for idx_offset, d_idx in enumerate(range(i1, i2)):
                s = prev_end + idx_offset * slot_duration
                e = s + slot_duration
                token_times[d_idx] = (s, e, display_tokens[d_idx])

    last_end = 0.0
    for idx in range(len(token_times)):
        if token_times[idx] is None:
            next_val = None
            for future in range(idx + 1, len(token_times)):
                if token_times[future] is not None:
                    next_val = token_times[future]
                    break
            if next_val:
                slot = (next_val[0] - last_end) / 2.0
                token_times[idx] = (last_end, last_end + slot, display_tokens[idx])
            else:
                token_times[idx] = (last_end, last_end + 0.3, display_tokens[idx])
        last_end = token_times[idx][1]

    words = []
    prev_end_frame = 0
    for idx, tok in enumerate(display_tokens):
        s, e, spoken = token_times[idx]
        start_frame = max(int(round(s * fps)), prev_end_frame)
        end_frame = max(int(round(e * fps)), start_frame + 1)
        prev_end_frame = end_frame

        words.append({
            "word": tok,
            "spoken": spoken.strip() if isinstance(spoken, str) else tok,
            "startSec": round(start_frame / float(fps), 3),
            "endSec": round(end_frame / float(fps), 3),
            "startFrame": start_frame,
            "endFrame": end_frame,
        })

    return words

def generate_audio(text: str, voice: str, clone_ref: str, clone_text: str, fps: int, audio_path: str, json_path: str):
    """
    Generates audio using VieNeu-TTS (48kHz) and aligns word boundaries using faster-whisper.
    """
    from vieneu import Vieneu
    from faster_whisper import WhisperModel

    spoken_text, display_tokens = transform_phonetics(text)
    print(f"\n[VieNeu-TTS Engine (48kHz Studio Quality)]")
    print(f"Original Text: {text}")
    print(f"Spoken Text (Phonetic Engine): {spoken_text}")
    if clone_ref:
        print(f"Voice Cloning Target: {clone_ref}")
    else:
        print(f"Voice: {voice}")

    print("Synthesizing neural audio...")
    tts = Vieneu()
    if clone_ref:
        audio = tts.infer(text=spoken_text, ref_audio=clone_ref, ref_text=clone_text)
    else:
        audio = tts.infer(text=spoken_text, voice=voice)

    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp_wav:
        tmp_wav_path = tmp_wav.name

    try:
        tts.save(audio, tmp_wav_path)

        # Convert to target format
        if audio_path.lower().endswith(".mp3"):
            print(f"Encoding to 48kHz MP3 via Remotion FFmpeg: {audio_path}")
            convert_wav_to_mp3(tmp_wav_path, audio_path)
        else:
            import shutil
            shutil.copyfile(tmp_wav_path, audio_path)

        print("Aligning word timestamps via faster-whisper...")
        whisper_model = WhisperModel("base", device="cpu", compute_type="int8")
        segments, _ = whisper_model.transcribe(
            tmp_wav_path,
            language="vi",
            word_timestamps=True,
            condition_on_previous_text=False,
            initial_prompt=spoken_text
        )

        whisper_words = []
        for segment in segments:
            for w in segment.words:
                whisper_words.append({
                    "word": w.word.strip(),
                    "start": w.start,
                    "end": max(w.end, w.start + 0.04)
                })

        words = align_words_with_whisper(display_tokens, whisper_words, fps=fps)

        last_end_frame = words[-1]["endFrame"] if words else 0
        total_frames = last_end_frame + int(round(1.5 * fps))
        total_sec = total_frames / float(fps)

        output_payload = {
            "text": text,
            "spokenText": spoken_text,
            "engine": "vieneu",
            "voice": voice if not clone_ref else f"cloned:{os.path.basename(clone_ref)}",
            "rate": "normal",
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

    finally:
        if os.path.exists(tmp_wav_path):
            os.remove(tmp_wav_path)

def list_voices():
    print("=== VieNeu-TTS Preset Voices ===")
    try:
        from vieneu import Vieneu
        tts = Vieneu()
        for desc, v_id in tts.list_preset_voices():
            print(f"  • {v_id:<18} : {desc}")
    except Exception as e:
        print(f"Could not load VieNeu voices: {e}")

def main():
    parser = argparse.ArgumentParser(description="VieNeu-TTS & Faster-Whisper Subtitle Generator for Remotion Shorts")
    parser.add_argument("--text", type=str, help="Text to speak")
    parser.add_argument("--file", type=str, help="Text file to read")
    parser.add_argument("--voice", type=str, default="Hải Đăng", help="Voice name (default: 'Hải Đăng')")
    parser.add_argument("--clone-ref", type=str, default=None, help="Path to reference audio file (.wav) for Instant Voice Cloning")
    parser.add_argument("--clone-text", type=str, default=None, help="Transcript of reference audio (optional, improves cloning quality)")
    parser.add_argument("--fps", type=int, default=30, help="Frames per second (default: 30)")
    parser.add_argument("--output-audio", type=str, help="Path to output audio (.mp3 or .wav)")
    parser.add_argument("--output-json", type=str, help="Path to output json metadata")
    parser.add_argument("--list-voices", action="store_true", help="List all available voices and exit")

    args = parser.parse_args()

    if args.list_voices:
        list_voices()
        sys.exit(0)

    if not args.output_audio or not args.output_json:
        print("Error: --output-audio and --output-json are required when generating speech", file=sys.stderr)
        sys.exit(1)

    if args.file:
        with open(args.file, "r", encoding="utf-8") as f:
            text = f.read().strip()
    elif args.text:
        text = args.text.strip()
    else:
        print("Error: Either --text or --file is required", file=sys.stderr)
        sys.exit(1)

    os.makedirs(os.path.dirname(os.path.abspath(args.output_audio)), exist_ok=True)
    os.makedirs(os.path.dirname(os.path.abspath(args.output_json)), exist_ok=True)

    generate_audio(
        text=text,
        voice=args.voice,
        clone_ref=args.clone_ref,
        clone_text=args.clone_text,
        fps=args.fps,
        audio_path=args.output_audio,
        json_path=args.output_json
    )

if __name__ == "__main__":
    main()
