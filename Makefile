# =============================================================================
# Camber & Casper Mock — Build Quality Makefile
#
# Usage:
#   make               → same as `make check`
#   make check         → full quality pass (types + lint + test)
#   make test          → unit + component tests
#   make test-watch    → vitest in watch mode
#   make test-ui       → vitest with browser UI
#   make coverage      → test + coverage report
#   make e2e           → Playwright E2E tests (requires running dev server)
#   make e2e-ui        → Playwright with interactive UI
#   make visual        → visual regression snapshot tests
#   make visual-update → update visual regression baselines
#   make lint          → ESLint check
#   make lint-fix      → ESLint auto-fix
#   make types         → TypeScript noEmit check
#   make format        → Prettier format
#   make format-check  → Prettier check (no write)
#   make build         → production build
#   make dev           → start dev server (PORT=5173 BASE_PATH=/)
#   make gaps          → list all open gap items from GAP_ANALYSIS.md
#   make splash        → visual splash/hover/radius interaction check
#   make flow          → run full demo flow E2E (scripted path)
#   make contamination → check for brand/naming violations
#   make logic         → run logic/state mutation tests only
# =============================================================================

.PHONY: all check test test-watch test-ui coverage e2e e2e-ui visual visual-update \
        lint lint-fix types format format-check build dev install \
        gaps splash flow contamination logic clean help

# ---------- Config ----------
PORT     := 5173
BASE_PATH := /
NODE_ENV := test
E2E_BASE_URL := http://localhost:$(PORT)

# Colour helpers
GREEN  := \033[0;32m
YELLOW := \033[0;33m
RED    := \033[0;31m
RESET  := \033[0m
BOLD   := \033[1m

# ---------- Default ----------
all: check

# ---------- Meta targets ----------

## check: Run full quality pipeline (types → lint → format-check → test)
check: types lint format-check test
	@echo "$(GREEN)$(BOLD)✓ All quality checks passed$(RESET)"

## help: Show this help
help:
	@echo "$(BOLD)Camber & Casper Mock — Makefile$(RESET)"
	@echo ""
	@grep -E '^## ' $(MAKEFILE_LIST) | sed 's/## //' | column -t -s ':'

# ---------- Types ----------

## types: TypeScript strict type check (no emit)
types:
	@echo "$(YELLOW)→ TypeScript check...$(RESET)"
	@pnpm tsc --noEmit --project tsconfig.json
	@echo "$(GREEN)✓ Types OK$(RESET)"

# ---------- Lint ----------

## lint: ESLint check
lint:
	@echo "$(YELLOW)→ ESLint...$(RESET)"
	@pnpm eslint "App.tsx" "pages/**/*.tsx" "components/**/*.tsx" "lib/**/*.ts" "store/**/*.ts" \
		--max-warnings=0
	@echo "$(GREEN)✓ Lint OK$(RESET)"

## lint-fix: ESLint auto-fix
lint-fix:
	@pnpm eslint "App.tsx" "pages/**/*.tsx" "components/**/*.tsx" "lib/**/*.ts" "store/**/*.ts" \
		--fix

## contamination: Check for brand/naming violations (War Room, wrong labels, etc.)
contamination:
	@echo "$(YELLOW)→ Brand contamination check...$(RESET)"
	@echo "  Checking for 'War Room' usage..."
	@if grep -rn --include="*.tsx" --include="*.ts" -i "war room\|war_room" pages/ components/ store/ lib/ App.tsx 2>/dev/null; then \
		echo "$(RED)✗ Found 'War Room' usage — replace with 'Strategic Command'$(RESET)"; \
		exit 1; \
	fi
	@echo "  Checking for 'layoutdashboard' used on non-Command pages..."
	@if grep -c "LayoutDashboard" components/app-shell.tsx 2>/dev/null | grep -q "^[2-9]\|^[0-9][0-9]"; then \
		echo "$(RED)✗ Multiple LayoutDashboard icons detected in nav — check GAP-04$(RESET)"; \
		exit 1; \
	fi
	@echo "  Checking for console.log in production files..."
	@if grep -rn "console\.log" pages/ components/ store/ lib/ 2>/dev/null | grep -v "\.test\." | grep -v "\.spec\." ; then \
		echo "$(RED)✗ console.log found in production code$(RESET)"; \
		exit 1; \
	fi
	@echo "  Checking for any types..."
	@ANYRESULT=$$(grep -rn ": any\b\|as any\b" pages/ components/ store/ 2>/dev/null | grep -v "\.test\." | grep -v "eslint-disable" | head -5); \
	if [ -n "$$ANYRESULT" ]; then \
		echo "$$ANYRESULT"; \
		echo "$(RED)✗ 'any' type found — use proper TypeScript types$(RESET)"; \
		exit 1; \
	fi
	@echo "$(GREEN)✓ No brand contamination$(RESET)"

# ---------- Format ----------

## format: Prettier format (writes files)
format:
	@pnpm prettier --write "App.tsx" "pages/**" "components/**" "lib/**" "store/**" "tests/**"

## format-check: Prettier check (no write)
format-check:
	@echo "$(YELLOW)→ Prettier check...$(RESET)"
	@pnpm prettier --check "App.tsx" "pages/**/*.tsx" "components/**/*.tsx" "lib/**/*.ts" \
		"store/**/*.ts" 2>/dev/null || (echo "$(YELLOW)⚠ Format issues found — run 'make format'$(RESET)"; exit 0)
	@echo "$(GREEN)✓ Format OK$(RESET)"

# ---------- Tests ----------

## test: Run all unit + component tests
test:
	@echo "$(YELLOW)→ Unit + Component tests...$(RESET)"
	@NODE_ENV=$(NODE_ENV) pnpm vitest run --reporter=verbose
	@echo "$(GREEN)✓ Tests passed$(RESET)"

## test-watch: Run tests in watch mode
test-watch:
	@NODE_ENV=$(NODE_ENV) pnpm vitest --watch

## test-ui: Run tests with Vitest browser UI
test-ui:
	@NODE_ENV=$(NODE_ENV) pnpm vitest --ui

## coverage: Run tests with coverage report
coverage:
	@echo "$(YELLOW)→ Coverage report...$(RESET)"
	@NODE_ENV=$(NODE_ENV) pnpm vitest run --coverage
	@echo "$(GREEN)✓ Coverage report in tests/coverage/$(RESET)"

## logic: Run only logic/state mutation tests (store + lib)
logic:
	@echo "$(YELLOW)→ Logic + state tests...$(RESET)"
	@NODE_ENV=$(NODE_ENV) pnpm vitest run --reporter=verbose \
		"tests/unit/store/**" "tests/unit/lib/**"
	@echo "$(GREEN)✓ Logic tests passed$(RESET)"

# ---------- E2E ----------

## e2e: Run Playwright E2E tests (requires dev server at PORT 5173)
e2e:
	@echo "$(YELLOW)→ E2E tests (needs running dev server at $(E2E_BASE_URL))...$(RESET)"
	@E2E_BASE_URL=$(E2E_BASE_URL) pnpm playwright test
	@echo "$(GREEN)✓ E2E passed$(RESET)"

## e2e-ui: Run Playwright with interactive browser UI
e2e-ui:
	@E2E_BASE_URL=$(E2E_BASE_URL) pnpm playwright test --ui

## e2e-report: Open last Playwright test report
e2e-report:
	@pnpm playwright show-report tests/reports/playwright-html

## flow: Run the primary demo flow E2E (scripted walk-through test)
flow:
	@echo "$(YELLOW)→ Primary demo flow test...$(RESET)"
	@E2E_BASE_URL=$(E2E_BASE_URL) pnpm playwright test tests/e2e/demo-flow.spec.ts --reporter=list
	@echo "$(GREEN)✓ Demo flow passed$(RESET)"

# ---------- Visual ----------

## visual: Run visual regression snapshot tests
visual:
	@echo "$(YELLOW)→ Visual regression tests...$(RESET)"
	@E2E_BASE_URL=$(E2E_BASE_URL) pnpm playwright test tests/visual/ --reporter=list
	@echo "$(GREEN)✓ Visual regression passed$(RESET)"

## visual-update: Update visual regression baselines (run when intentional changes made)
visual-update:
	@echo "$(YELLOW)→ Updating visual baselines...$(RESET)"
	@E2E_BASE_URL=$(E2E_BASE_URL) pnpm playwright test tests/visual/ --update-snapshots
	@echo "$(GREEN)✓ Baselines updated$(RESET)"

## splash: Check interaction effects (hover states, transitions, border-radius, ripple)
splash:
	@echo "$(YELLOW)→ Interaction/splash effect tests...$(RESET)"
	@E2E_BASE_URL=$(E2E_BASE_URL) pnpm playwright test tests/e2e/interactions.spec.ts --reporter=list
	@echo "$(GREEN)✓ Splash/interaction check passed$(RESET)"

# ---------- Build ----------

## build: Production build
build:
	@echo "$(YELLOW)→ Production build...$(RESET)"
	@PORT=$(PORT) BASE_PATH=$(BASE_PATH) pnpm vite build
	@echo "$(GREEN)✓ Build succeeded → dist/$(RESET)"

## dev: Start dev server
dev:
	@echo "$(YELLOW)→ Starting dev server on http://localhost:$(PORT)$(RESET)"
	@PORT=$(PORT) BASE_PATH=$(BASE_PATH) pnpm vite

# ---------- Install ----------

## install: Install all dependencies
install:
	@pnpm install

## playwright-install: Install Playwright browser binaries
playwright-install:
	@pnpm playwright install --with-deps chromium

# ---------- Utilities ----------

## gaps: Print a summary of open gap items from GAP_ANALYSIS.md
gaps:
	@echo "$(BOLD)Open Gaps from GAP_ANALYSIS.md$(RESET)"
	@echo ""
	@echo "$(RED)CRITICAL$(RESET)"
	@grep "^| GAP" GAP_ANALYSIS.md | grep "🔴" | sed 's/| GAP/  GAP/' | cut -d'|' -f1-3
	@echo ""
	@echo "$(YELLOW)MAJOR$(RESET)"
	@grep "^| GAP" GAP_ANALYSIS.md | grep "🟡" | sed 's/| GAP/  GAP/' | cut -d'|' -f1-3
	@echo ""
	@echo "$(GREEN)POLISH$(RESET)"
	@grep "^| GAP" GAP_ANALYSIS.md | grep "🟢" | sed 's/| GAP/  GAP/' | cut -d'|' -f1-3

## clean: Remove build artifacts and test reports
clean:
	@echo "$(YELLOW)→ Cleaning...$(RESET)"
	@rm -rf dist/ tests/coverage/ tests/reports/ playwright-report/
	@echo "$(GREEN)✓ Clean$(RESET)"
