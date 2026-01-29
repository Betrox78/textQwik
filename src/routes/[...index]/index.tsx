import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { fetchOneEntry, Content } from "@builder.io/sdk-qwik";


export const BUILDER_PUBLIC_API_KEY = "611cce7cd17f43e19dcd4d0e8298a0ab";
export const BUILDER_MODEL = "page";

export const useBuilderContent = routeLoader$(async ({ url }) => {
 
  const content = await fetchOneEntry({
    model: BUILDER_MODEL,
    apiKey: BUILDER_PUBLIC_API_KEY,
    userAttributes: {
      urlPath: url.pathname || "/",
    },
  });

  return content;
});

export default component$(() => {
  const builderContent = useBuilderContent();

  
  if (!builderContent.value) {
    return <div>No se encontró contenido en Builder.io para esta ruta.</div>;
  }

  return (
    <Content
      model={BUILDER_MODEL}
      content={builderContent.value}
      apiKey={BUILDER_PUBLIC_API_KEY}
    />
  );
});