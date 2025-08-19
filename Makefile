.PHONY: web-fmt
web-fmt:
	cd web && \
	npm run fmt

.PHONY: web-dev
web-dev:
	cd web && \
	npm run dev
