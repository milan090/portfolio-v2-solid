import { Component, JSX, createSignal, onMount } from 'solid-js';

interface ClientOnlyProps {
  children: JSX.Element;
  fallback?: JSX.Element;
}

const ClientOnly: Component<ClientOnlyProps> = (props) => {
  const [isClient, setIsClient] = createSignal(false);

  onMount(() => {
    setIsClient(true);
  });

  return (
    <>
      {isClient() ? props.children : props.fallback || null}
    </>
  );
};

export default ClientOnly;