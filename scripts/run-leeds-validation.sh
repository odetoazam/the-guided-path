#!/usr/bin/env bash
# Run Leeds morphology validator across all tadabbur files
# Outputs only files with failures, plus a summary at the end.

cd "$(dirname "$0")/.."

REPORT=scripts/leeds-validation-report.md
echo "# Leeds Morphology Validation Report" > $REPORT
echo "Generated: $(date)" >> $REPORT
echo "" >> $REPORT
echo "Files with morphology root/form mismatches against Leeds Quranic Corpus:" >> $REPORT
echo "" >> $REPORT

TOTAL=0
WITH_CLAIMS=0
PASSED=0
FAILED=0
FAIL_FILES=()

for f in $(find content/tadabbur -name "*.md" ! -name "tafsir-report-*" ! -path "*/needs-review/*"); do
  TOTAL=$((TOTAL + 1))
  output=$(node scripts/validate-morphology-leeds.mjs "$f" 2>&1)

  # Skip files with no claims
  if echo "$output" | grep -q "Claims found: 0 roots, 0 verb forms"; then
    continue
  fi

  WITH_CLAIMS=$((WITH_CLAIMS + 1))

  # Check for failures
  if echo "$output" | grep -qE "[1-9]+[0-9]* ✗"; then
    FAILED=$((FAILED + 1))
    FAIL_FILES+=("$f")
    {
      echo "## $f"
      echo ""
      echo "\`\`\`"
      echo "$output" | grep -E "^\s+✗"
      echo ""
      echo "$output" | tail -3
      echo "\`\`\`"
      echo ""
    } >> $REPORT
  else
    PASSED=$((PASSED + 1))
  fi
done

{
  echo ""
  echo "---"
  echo ""
  echo "## Summary"
  echo "- Total files scanned: $TOTAL"
  echo "- Files with morphology claims: $WITH_CLAIMS"
  echo "- ✅ Passed (all claims verified): $PASSED"
  echo "- ❌ Failed (one or more mismatches): $FAILED"
} >> $REPORT

echo "Done."
echo "  Scanned: $TOTAL"
echo "  With claims: $WITH_CLAIMS"
echo "  Passed: $PASSED"
echo "  Failed: $FAILED"
echo "Report: $REPORT"
