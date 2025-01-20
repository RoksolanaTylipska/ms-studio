export interface Master {
  id: string; 
  name: { [key: string]: string }; 
  position: { [key: string]: string };
  description?: { [key: string]: string };
  img: string;
}