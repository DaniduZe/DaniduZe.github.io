import { motion } from 'framer-motion';
import { ArrowRight, Bot, Cpu, Layers, Radio, Sparkles } from 'lucide-react';
import {
  CAPABILITY_STACKS,
  HARDWARE_LAYER_NODES,
  SIGNAL_PATH_STEPS,
} from '../data/capabilities';

function StackChip({ label }: { label: string }) {
  return (
    <span className="inline-flex h-[26px] items-center rounded-md border border-[#222226] bg-[#131315] px-2.5 font-mono text-[11px] text-[#B4B4BB]">
      {label}
    </span>
  );
}

export function CapabilitiesBento() {
  return (
    <section id="stack" className="relative py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-20">
        {/* Section Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 lg:mb-12 lg:flex-row lg:items-end">
          <div>
            <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#C6F432] lg:text-xs">
              <span className="text-[#55555C]">02 /</span> Capabilities
            </div>
            <h2 className="mt-3.5 max-w-[720px] text-[36px] leading-[1.03] font-semibold tracking-[-0.045em] text-[#EDEDED] sm:text-[46px] lg:mt-4 lg:text-[56px]">
              From copper traces <span className="text-[#55555C]">to cloud inference.</span>
            </h2>
          </div>
          <p className="max-w-[360px] text-[15px] leading-[1.6] text-[#8A8A93]">
            One engineer across the full signal path — sense, process, transmit, store, visualise,
            infer.
          </p>
        </div>

        {/* Bento Grid (2-col on mobile, 4-col asymmetric on desktop) */}
        <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4 lg:gap-5">
          {/* L1 · Hardware: Electronics & Hardware (spans 2 cols × 2 rows on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35 }}
            className="col-span-2 flex flex-col justify-between rounded-[18px] border border-[#1C1C1F] bg-[#0F0F10] p-5 transition-colors hover:border-[#2A2A2E] lg:row-span-2 lg:p-6"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#C6F432]/20 bg-[#C6F432]/[0.08] text-[#C6F432]">
                  <Cpu className="h-5 w-5" aria-hidden="true" />
                </div>
                <span className="font-mono text-[11px] tracking-[0.06em] text-[#55555C]">
                  L1 · HARDWARE
                </span>
              </div>

              <h3 className="mt-5 text-[21px] font-semibold tracking-[-0.03em] text-[#EDEDED] lg:text-2xl">
                Electronics &amp; Hardware
              </h3>
              <p className="mt-2 text-sm leading-[1.55] text-[#8A8A93]">
                End-to-end hardware engineering from power regulation and sensor interfacing to
                embedded compute and actuation:
              </p>

              {/* General Hardware Stack Diagram */}
              <div className="mt-6 flex flex-col gap-2.5">
                {HARDWARE_LAYER_NODES.map((node) => (
                  <div
                    key={node.label}
                    className={`flex h-11 items-center justify-between rounded-[10px] border px-3.5 font-mono text-xs ${
                      node.highlight
                        ? 'border-[#C6F432]/45 bg-[#C6F432]/[0.05] text-[#C6F432]'
                        : 'border-[#26262A] bg-[#121214] text-[#D4D4D8]'
                    }`}
                  >
                    <span className="truncate">{node.label}</span>
                    <span className="ml-2 shrink-0 text-[10.5px] text-[#55555C]">{node.role}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {CAPABILITY_STACKS.hardware.map((item) => (
                <StackChip key={item} label={item} />
              ))}
            </div>
          </motion.div>

          {/* L2 · Firmware: Embedded & IoT Systems (spans 2 cols on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="col-span-2 flex flex-col justify-between rounded-[18px] border border-[#1C1C1F] bg-[#0F0F10] p-5 transition-colors hover:border-[#2A2A2E] lg:p-6"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#C6F432]/20 bg-[#C6F432]/[0.08] text-[#C6F432]">
                  <Radio className="h-5 w-5" aria-hidden="true" />
                </div>
                <span className="font-mono text-[11px] tracking-[0.06em] text-[#55555C]">
                  L2 · FIRMWARE
                </span>
              </div>

              <h3 className="mt-5 text-[21px] font-semibold tracking-[-0.03em] text-[#EDEDED] lg:text-2xl">
                Embedded &amp; IoT Systems
              </h3>
              <p className="mt-2 text-sm leading-[1.55] text-[#8A8A93]">
                Production firmware, edge-to-cloud connectivity, and resilient device architectures
                built for continuous operation.
              </p>

              {/* Clean 3-Layer Embedded & IoT Architecture Strip */}
              <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                <div className="rounded-[10px] border border-[#26262A] bg-[#121214] px-3.5 py-3">
                  <div className="font-mono text-[10.5px] tracking-[0.06em] text-[#C6F432]">
                    EDGE FIRMWARE
                  </div>
                  <div className="mt-1.5 font-mono text-[11px] leading-[1.55] text-[#8A8A93]">
                    drivers · real-time loops · failsafes
                  </div>
                </div>

                <div className="rounded-[10px] border border-[#26262A] bg-[#121214] px-3.5 py-3">
                  <div className="font-mono text-[10.5px] tracking-[0.06em] text-[#C6F432]">
                    CONNECTIVITY
                  </div>
                  <div className="mt-1.5 font-mono text-[11px] leading-[1.55] text-[#8A8A93]">
                    wireless · serial · secure telemetry
                  </div>
                </div>

                <div className="rounded-[10px] border border-[#26262A] bg-[#121214] px-3.5 py-3">
                  <div className="font-mono text-[10.5px] tracking-[0.06em] text-[#C6F432]">
                    CLOUD BRIDGE
                  </div>
                  <div className="mt-1.5 font-mono text-[11px] leading-[1.55] text-[#8A8A93]">
                    remote control · OTA · diagnostics
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {CAPABILITY_STACKS.firmware.map((item) => (
                <StackChip key={item} label={item} />
              ))}
            </div>
          </motion.div>

          {/* L3 · Robotics (1 col) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="col-span-1 flex flex-col justify-between rounded-[18px] border border-[#1C1C1F] bg-[#0F0F10] p-4 transition-colors hover:border-[#2A2A2E] lg:p-6"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-[#C6F432]/20 bg-[#C6F432]/[0.08] text-[#C6F432] lg:h-10 lg:w-10">
                  <Bot className="h-[18px] w-[18px] lg:h-5 lg:w-5" aria-hidden="true" />
                </div>
                <span className="font-mono text-[11px] tracking-[0.06em] text-[#55555C]">L3</span>
              </div>

              <h3 className="mt-4 text-[19px] font-semibold tracking-[-0.03em] text-[#EDEDED] lg:mt-5 lg:text-2xl">
                Robotics
              </h3>
              <p className="mt-2 text-[13px] leading-[1.55] text-[#8A8A93] lg:text-sm">
                Autonomous navigation, multi-sensor fusion, state estimation, and closed-loop motion
                control.
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {CAPABILITY_STACKS.robotics.map((item) => (
                <StackChip key={item} label={item} />
              ))}
            </div>
          </motion.div>

          {/* L5 · AI Development (1 col) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35, delay: 0.12 }}
            className="col-span-1 flex flex-col justify-between rounded-[18px] border border-[#1C1C1F] bg-[#0F0F10] p-4 transition-colors hover:border-[#2A2A2E] lg:p-6"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-[#C6F432]/20 bg-[#C6F432]/[0.08] text-[#C6F432] lg:h-10 lg:w-10">
                  <Sparkles className="h-[18px] w-[18px] lg:h-5 lg:w-5" aria-hidden="true" />
                </div>
                <span className="font-mono text-[11px] tracking-[0.06em] text-[#55555C]">L5</span>
              </div>

              <h3 className="mt-4 text-[19px] font-semibold tracking-[-0.03em] text-[#EDEDED] lg:mt-5 lg:text-2xl">
                AI Development
              </h3>
              <p className="mt-2 text-[13px] leading-[1.55] text-[#8A8A93] lg:text-sm">
                Edge computer vision pipelines, LLM agents with tool calling, and cloud AI
                integrations.
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {CAPABILITY_STACKS.ai.map((item) => (
                <StackChip key={item} label={item} />
              ))}
            </div>
          </motion.div>

          {/* L4 · Software: Full-Stack, Mobile & Cloud (spans 2 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35, delay: 0.14 }}
            className="col-span-2 flex flex-col justify-between rounded-[18px] border border-[#1C1C1F] bg-[#0F0F10] p-5 transition-colors hover:border-[#2A2A2E] lg:p-6"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#C6F432]/20 bg-[#C6F432]/[0.08] text-[#C6F432]">
                  <Layers className="h-5 w-5" aria-hidden="true" />
                </div>
                <span className="font-mono text-[11px] tracking-[0.06em] text-[#55555C]">
                  L4 · SOFTWARE
                </span>
              </div>

              <h3 className="mt-5 text-[21px] font-semibold tracking-[-0.03em] text-[#EDEDED] lg:text-2xl">
                Full-Stack, Mobile &amp; Cloud
              </h3>
              <p className="mt-2 text-sm leading-[1.55] text-[#8A8A93]">
                Real-time dashboards, scalable APIs, relational and time-series databases, and
                cross-platform mobile apps.
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {CAPABILITY_STACKS.software.map((item) => (
                <StackChip key={item} label={item} />
              ))}
            </div>
          </motion.div>

          {/* End-to-End Signal Path Tile (spans 2 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35, delay: 0.16 }}
            className="relative col-span-2 flex flex-col justify-between rounded-[18px] border border-[#1C1C1F] bg-[#0F0F10] p-5 transition-colors hover:border-[#2A2A2E] lg:p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#C6F432]/20 bg-[#C6F432]/[0.08] text-[#C6F432]">
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </div>
              <span className="font-mono text-[11px] tracking-[0.06em] text-[#55555C]">
                SIGNAL PATH
              </span>
            </div>

            {/* Horizontal 6-Node Signal Pipeline */}
            <div className="relative my-7">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-[6px] right-7 left-7 h-px bg-gradient-to-r from-[#C6F432]/70 via-[#C6F432]/30 to-[#C6F432]/70"
              />
              <div className="relative grid grid-cols-3 gap-y-5 sm:grid-cols-6">
                {SIGNAL_PATH_STEPS.map((step) => (
                  <div key={step.stage} className="text-center">
                    <div
                      className={`mx-auto h-3 w-3 rounded-full border-2 border-[#C6F432] ${
                        step.filled ? 'bg-[#C6F432]' : 'bg-[#0A0A0A]'
                      }`}
                    />
                    <div className="mt-2.5 font-mono text-[11px] text-[#B4B4BB]">{step.stage}</div>
                    <div className="mt-0.5 font-mono text-[10.5px] text-[#55555C]">
                      {step.layer}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-sm leading-[1.55] text-[#8A8A93]">
              Every layer of the stack, owned end-to-end.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
