const chalk = require('chalk'); // Jest uses chalk for colors
class CustomReporter {
    constructor() {
        this.passedTests = 0;
        this.failedTests = 0;
        this.error = false;
    }

    onTestResult(test, result) {
        // console.log("RESULT >>>", result);
        if (result.failureMessage && result.testResults.length == 0) {
            console.log(`\n`);
            console.log(result.failureMessage);
            console.log(`${chalk.red("Please resolve error and run tests again.")}`);
            console.log(`\n`);
            this.error = true;
            return
        }
        // console.log(`\n`);
        // console.log(`\t${chalk.bold("Running Tests")}`);
        // console.log(`\n`);
        result.testResults.forEach((assertionResult) => {
            // console.log(assertionResult);
            if (assertionResult.status === 'failed') {
                this.failedTests += 1;
                // Print test name with cross symbol and red color
                // console.log(`\t${chalk.red('✕',assertionResult.fullName)}`);

                assertionResult.failureMessages.forEach((message, index) => {
                    // Remove lines containing 'Expected:' and 'Received:'
                    const cleanedMessage = message
                        .split('\n')
                        .filter(line => !line.trim().startsWith('Expected:') && !line.trim().startsWith('Received:'))
                        .join('\n');
                });
            }
            if (assertionResult.status === 'passed') {
                this.passedTests += 1;
                // Print successful test names with tick symbol and green color
                // console.log(`\t${chalk.green('✓',assertionResult.fullName)}`);
            }
        });
        // console.log(`\n`);
        // console.log(`\t${chalk.bold("Tests Completed")}`);
        // console.log(`\n`);
    }

    onRunComplete(contexts, results) {
        if (!this.error) {
            console.log(`\n`);
            results.testResults.forEach((testSuite) => {
                // console.log(`\nTest Suite: ${testSuite.testFilePath}`);

                // Group tests by ancestorTitles (describe blocks)
                const groupedByQuestions = testSuite.testResults.reduce((acc, testCase) => {
                    const question = testCase.ancestorTitles[0] || "Ungrouped";
                    if (!acc[question]) acc[question] = [];
                    acc[question].push(testCase);
                    return acc;
                }, {});

                Object.entries(groupedByQuestions).forEach(([question, tests]) => {
                    // console.log("TESTS >>>",tests);
                    console.log(`\n\t${chalk.blue.bold(question)}`);
                    tests.forEach((testCase) => {
                        if (testCase.status === "failed") {
                            console.log(`\t${chalk.red('✕', testCase.title)}`);
                        }
                        if (testCase.status === "passed") {
                            console.log(`\t${chalk.green('✓', testCase.title)}`);
                        }
                    });
                });
            });

            console.log(chalk.bold('\n\tTest Summary:'));
            console.log(`\t${chalk.green.bold('✓ Passed:')} ${this.passedTests}`);
            console.log(`\t${chalk.red.bold('✕ Failed:')} ${this.failedTests}`);
            console.log(`\n`);
        }

    }

}

module.exports = CustomReporter;