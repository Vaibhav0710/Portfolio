import type { Skill, SkillFilter } from "./constants";

export type SkillFilterValue = SkillFilter["id"];

/** A chip is dimmed when a filter other than "all" is on and the skill was not used there */
export const isDimmed = (skill: Pick<Skill, "where">, filter: SkillFilterValue): boolean =>
  filter !== "all" && skill.where !== filter;
