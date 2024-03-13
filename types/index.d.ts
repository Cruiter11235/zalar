declare module "*.vue" {
  import { defineComponent } from "vue";
  const component: ReturnType<typeof defineComponent>;
  export default component;
}
declare module "mockjs" ;

declare interface DirectiveArgs {
  callback: Function;
  delay: number;
}
