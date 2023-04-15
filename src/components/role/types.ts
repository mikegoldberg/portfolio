type Title = string;
type Company = string;
type Description = string;
type Skillset = Array<string>;
type Achievements = Array<string>;
type Start = string;
type End = string | null;
type Contract = boolean;

export interface RoleProps {
  title: Title;
  company: Company;
  description: Description;
  skillset: Skillset;
  achievements: Achievements;
  start: Start;
  end: End;
  contract: Contract;
}
