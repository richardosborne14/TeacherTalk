# TeacherTalk Backend - Adaptive Learning System v2.0

⭐ **START HERE:** [Complete System Overview](docs/PROJECT_AUDIT_3.md)

## What Is This?

TeacherTalk is an adaptive language learning system with agentic AI that creates personalized learning journeys. This backend powers the intelligent routing, lesson management, and progress tracking.

## Architecture v2.0

**Two-Context System:**
- **Main Feed** (Lobby): Natural conversation, lesson proposals
- **Lesson Threads** (Classrooms): Focused learning, one language point + one skill

**Key Features:**
- Agentic AI routing (decides conversation vs JSON responses)
- Ephemeral lesson configs (evolve until confirmed)
- Multi-attempt activities with building feedback
- Transparent progress attribution (drill-down to see contributions)
- Continuous learner model adaptation

## Quick Start

1. Read [Complete System Overview](docs/PROJECT_AUDIT_3.md)
2. Review [Architecture Overview](docs/ARCHITECTURE_OVERVIEW.md)
3. Check [Development Roadmap](docs/DEVELOPMENT_ROADMAP.md)
4. See [.clinerules/](.clinerules/) for development standards

## Tech Stack

- **Database:** Directus on PostgreSQL (11 tables)
- **Vector Store:** Qdrant (RAG memory)
- **AI Orchestration:** n8n (8 workflows)
- **AI Models:** Groq Llama 3.3, OpenAI (TTS/STT), Claude (activities)
- **API:** Express (17 endpoints)

## Documentation Structure

📚 **Core Architecture:**
- [ARCHITECTURE_OVERVIEW.md](docs/ARCHITECTURE_OVERVIEW.md) - System design
- [PROJECT_AUDIT_3.md](docs/PROJECT_AUDIT_3.md) - Complete overview

🗺️ **Development:**
- [DEVELOPMENT_ROADMAP.md](docs/DEVELOPMENT_ROADMAP.md) - Phase-by-phase guide
- [.clinerules/](.clinerules/) - Development standards & guides

🏗️ **Frontend:**
- [client/](client/) - React frontend (separate folder)
- [client/README.md](client/README.md) - Frontend docs

## Status

🔵 **Phase 0: Planning** - Architecture v2.0 approved, ready to build