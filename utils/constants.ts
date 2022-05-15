const TYPE_SPEED: number = 50;
const NEXT_QUOTE_DELAY: number = 2500;
interface quoteProp {
  author: string;
  content: string;
}
const API_LINK: string = "https://api.quotable.io/random";

export { TYPE_SPEED, NEXT_QUOTE_DELAY, API_LINK };
export type { quoteProp };
