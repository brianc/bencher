test:
	@find test -name "*-tests.js" | xargs -n 1 -I file node file

.PHONY : test
