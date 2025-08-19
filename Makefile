.PHONY: web-fmt
web-fmt:
	cd $(CURDIR)/web && \
	npm run fmt

.PHONY: web-dev
web-dev:
	cd $(CURDIR)/web && \
	npm run dev

.PHONY: wasm-build
wasm-build:
	cd $(CURDIR)/wasm && \
	wasm-pack build -t web -d $(CURDIR)/web/src/shared/PixelArtEditor --out-name index --release

.PHONY: wasm-fmt
wasm-fmt:
	cd $(CURDIR)/wasm && \
	cargo fmt

.PHONY: wasm-test
wasm-test:
	cd $(CURDIR)/wasm && \
	cargo test
