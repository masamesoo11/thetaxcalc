"use client";

import { useEffect } from "react";

/**
 * WebMCP Provider — Exposes site tools to AI agents via the browser
 * Implements the WebMCP API (navigator.modelContext.provideContext)
 * https://webmachinelearning.github.io/webmcp/
 */
export function WebMCPProvider() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const nav = navigator as any;
    if (!nav.modelContext || typeof nav.modelContext.provideContext !== "function") {
      return;
    }

    try {
      nav.modelContext.provideContext({
        tools: [
          {
            name: "calculate_paycheck",
            description: "Calculate take-home pay after federal, FICA, and state taxes. Returns annual and per-paycheck breakdown.",
            inputSchema: {
              type: "object",
              properties: {
                salary: {
                  type: "number",
                  description: "Annual salary in USD (e.g., 75000)"
                },
                state: {
                  type: "string",
                  description: "US state abbreviation (e.g., TX, CA, NY, FL, IL)"
                },
                filingStatus: {
                  type: "string",
                  enum: ["single", "married", "head_of_household"],
                  description: "Tax filing status"
                }
              },
              required: ["salary", "state"]
            },
            execute: async (input: { salary: number; state: string; filingStatus?: string }) => {
              const stateMap: Record<string, string> = {
                TX: "texas", CA: "california", NY: "new-york",
                FL: "florida", IL: "illinois", WA: "washington",
                GA: "georgia", AZ: "arizona", OH: "ohio", PA: "pennsylvania"
              };
              const stateSlug = stateMap[input.state?.toUpperCase()] || "texas";
              const url = `https://thetaxcalc.com/${stateSlug}-tax-calculator?salary=${input.salary}&frequency=annual&filing=${input.filingStatus || "single"}`;
              return {
                result: `To calculate take-home pay for $${input.salary} in ${input.state}, visit: ${url}`,
                url: url
              };
            }
          },
          {
            name: "calculate_sales_tax",
            description: "Calculate sales tax for any US state. Returns combined state + local tax rate and total amount.",
            inputSchema: {
              type: "object",
              properties: {
                amount: {
                  type: "number",
                  description: "Purchase amount in USD"
                },
                state: {
                  type: "string",
                  description: "US state name or abbreviation"
                }
              },
              required: ["amount", "state"]
            },
            execute: async (input: { amount: number; state: string }) => {
              const url = `https://thetaxcalc.com/sales-tax-calculator?amount=${input.amount}&state=${input.state}`;
              return {
                result: `To calculate sales tax on $${input.amount} in ${input.state}, visit: ${url}`,
                url: url
              };
            }
          },
          {
            name: "compare_state_taxes",
            description: "Compare tax burdens between two US states side by side.",
            inputSchema: {
              type: "object",
              properties: {
                state1: {
                  type: "string",
                  description: "First state name (e.g., california)"
                },
                state2: {
                  type: "string",
                  description: "Second state name (e.g., texas)"
                }
              },
              required: ["state1", "state2"]
            },
            execute: async (input: { state1: string; state2: string }) => {
              const slug = `${input.state1}-vs-${input.state2}`;
              const url = `https://thetaxcalc.com/compare/${slug}`;
              return {
                result: `Compare ${input.state1} vs ${input.state2} taxes at: ${url}`,
                url: url
              };
            }
          },
          {
            name: "calculate_lottery_tax",
            description: "Calculate how much tax you pay on lottery winnings. Federal + state taxes, lump sum vs annuity.",
            inputSchema: {
              type: "object",
              properties: {
                amount: {
                  type: "number",
                  description: "Lottery jackpot amount in USD"
                },
                state: {
                  type: "string",
                  description: "US state where ticket was purchased"
                },
                payout: {
                  type: "string",
                  enum: ["lump_sum", "annuity"],
                  description: "Payout type"
                }
              },
              required: ["amount"]
            },
            execute: async (input: { amount: number; state?: string; payout?: string }) => {
              const url = `https://thetaxcalc.com/lottery-tax-calculator?jackpot=${input.amount}&state=${input.state || "CA"}&payout=${input.payout || "lump_sum"}`;
              return {
                result: `Calculate lottery tax on $${input.amount} at: ${url}`,
                url: url
              };
            }
          },
          {
            name: "find_tax_brackets",
            description: "Get the 2026 federal income tax brackets for a specific filing status.",
            inputSchema: {
              type: "object",
              properties: {
                filingStatus: {
                  type: "string",
                  enum: ["single", "married_filing_jointly", "head_of_household"],
                  description: "Tax filing status"
                }
              },
              required: ["filingStatus"]
            },
            execute: async (input: { filingStatus: string }) => {
              const brackets: Record<string, Array<{rate: string; range: string}>> = {
                single: [
                  { rate: "10%", range: "$0 – $12,400" },
                  { rate: "12%", range: "$12,401 – $50,400" },
                  { rate: "22%", range: "$50,401 – $105,700" },
                  { rate: "24%", range: "$105,701 – $201,775" },
                  { rate: "32%", range: "$201,776 – $256,225" },
                  { rate: "35%", range: "$256,226 – $640,600" },
                  { rate: "37%", range: "Over $640,600" }
                ],
                married_filing_jointly: [
                  { rate: "10%", range: "$0 – $24,800" },
                  { rate: "12%", range: "$24,801 – $100,800" },
                  { rate: "22%", range: "$100,801 – $211,400" },
                  { rate: "24%", range: "$211,401 – $403,550" },
                  { rate: "32%", range: "$403,551 – $512,450" },
                  { rate: "35%", range: "$512,451 – $768,700" },
                  { rate: "37%", range: "Over $768,700" }
                ],
                head_of_household: [
                  { rate: "10%", range: "$0 – $17,700" },
                  { rate: "12%", range: "$17,701 – $67,450" },
                  { rate: "22%", range: "$67,451 – $105,700" },
                  { rate: "24%", range: "$105,701 – $201,750" },
                  { rate: "32%", range: "$201,751 – $256,200" },
                  { rate: "35%", range: "$256,201 – $640,600" },
                  { rate: "37%", range: "Over $640,600" }
                ]
              };
              const status = input.filingStatus as keyof typeof brackets;
              return {
                result: `2026 Federal Tax Brackets (${status}):\n${brackets[status]?.map(b => `${b.rate}: ${b.range}`).join("\n") || "Not found"}`,
                url: "https://thetaxcalc.com/federal-tax-brackets"
              };
            }
          }
        ]
      });
      console.log("[WebMCP] Tools registered successfully");
    } catch (e) {
      console.warn("[WebMCP] Failed to register tools:", e);
    }
  }, []);

  return null;
}
