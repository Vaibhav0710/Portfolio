"use client";

import { useState, type ReactNode } from "react";
import { SKILL_FILTERS, SKILL_GROUPS, SKILLS_SECTION, type Skill, type SkillGroup } from "@/lib/constants";
import { isDimmed, type SkillFilterValue } from "@/lib/skills";

interface FilterButtonsProps {
  filter: SkillFilterValue;
  onPick: (value: SkillFilterValue) => void;
}

const FilterButtons = ({ filter, onPick }: FilterButtonsProps) => (
  <div role="group" aria-label={SKILLS_SECTION.filterLabel} className="flex flex-wrap gap-2 rounded-[28px] bg-tint p-1.5">
    {SKILL_FILTERS.map((option) => {
      const pressed = option.id === filter;
      return (
        <button
          key={option.id}
          type="button"
          aria-pressed={pressed}
          onClick={() => onPick(option.id)}
          className={`press min-h-11 cursor-pointer rounded-full border-0 px-[18px] font-sans text-[15px] font-semibold ${
            pressed ? "bg-ink text-paper" : "bg-transparent text-ink"
          }`}
        >
          {option.label}
        </button>
      );
    })}
  </div>
);

// Dimmed chips stay in the list and are still read out; only their opacity drops.
// The opacity sits on the list item because `.lift` owns the chip's own `transition`.
const SkillChip = ({ skill, dimmed }: { skill: Skill; dimmed: boolean }) => (
  <li className={`flex transition-opacity duration-300 ${dimmed ? "opacity-[0.22]" : "opacity-100"}`}>
    <span className="lift inline-flex min-h-11 items-center gap-2.5 rounded-full border border-rule bg-plate px-4 font-sans text-[15px]">
      <span
        aria-hidden="true"
        className={`size-[9px] shrink-0 rounded-full border-2 border-ink ${skill.where === "work" ? "bg-ink" : "bg-transparent"}`}
      />
      {skill.name}
      <span className="sr-only">
        {" "}
        ({skill.where === "work" ? SKILLS_SECTION.workNote : SKILLS_SECTION.projectsNote})
      </span>
    </span>
  </li>
);

const SkillRow = ({ group, filter }: { group: SkillGroup; filter: SkillFilterValue }) => (
  <div className="rise flex flex-wrap gap-x-6 gap-y-3 border-t border-rule pt-5">
    <h3 className="m-0 w-52 font-sans text-[17px] font-bold">{group.category}</h3>
    <ul className="m-0 flex min-w-0 flex-[999_1_480px] list-none flex-wrap gap-2.5 p-0">
      {group.items.map((skill) => (
        <SkillChip key={skill.name} skill={skill} dimmed={isDimmed(skill, filter)} />
      ))}
    </ul>
  </div>
);

/** The heading row with the filter pills, then one row of chips per skill group */
export const SkillFilter = ({ heading }: { heading: ReactNode }) => {
  const [filter, setFilter] = useState<SkillFilterValue>("all");

  return (
    <>
      <div className="rise flex flex-wrap items-end justify-between gap-6">
        {heading}
        <FilterButtons filter={filter} onPick={setFilter} />
      </div>
      <div className="flex flex-col gap-7">
        {SKILL_GROUPS.map((group) => (
          <SkillRow key={group.category} group={group} filter={filter} />
        ))}
      </div>
    </>
  );
};
