/**
 * React hooks imported from the React library.
 *
 * - useState: allows a function to "remember" values between renders
 * - useEffect: allows us to run side effects (like opening a WebSocket)
 *   at specific moments of a component's lifecycle
 */
import { useEffect, useState } from 'react';

/**
 * Low-level WebSocket functions.
 *
 * IMPORTANT:
 * This file does NOT know how sockets work internally.
 * It only uses a service that handles connection details.
 *
 * This separation mirrors backend architecture:
 * - services = infrastructure
 * - hooks = orchestration / lifecycle
 */
import { connectSocket, disconnectSocket } from '../services/socket';

/**
 * Custom React Hook: useWebSocket
 *
 * A "hook" is just a normal function, but:
 * - Its name MUST start with "use"
 * - It can call other hooks (useState, useEffect)
 *
 * Purpose of this hook:
 * - Open a WebSocket connection
 * - Listen for events
 * - Store connection state
 * - Expose useful data to UI components
 */
export function useWebSocket() {

  /**
   * useState<any>(null)
   *
   * Let's break this down VERY carefully.
   *
   * 1) useState<T>()
   * ----------------
   * useState is a GENERIC function.
   * The <any> tells TypeScript:
   *   "This state can store values of any type."
   *
   * We use `any` here because:
   * - WebSocket messages can vary
   * - At this learning stage, flexibility is more important than strict typing
   *
   * Later, this will become:
   *   useState<GameEventDTO | null>
   *
   *
   * 2) Why does useState return an ARRAY?
   * -------------------------------------
   * useState returns a tuple:
   *   [currentValue, functionToUpdateValue]
   *
   * Example return value:
   *   [lastMessage, setLastMessage]
   *
   *
   * 3) Why this syntax: const [a, b] = ... ?
   * ------------------------------------------------
   * This is called ARRAY DESTRUCTURING.
   *
   * It means:
   *   const result = useState(null);
   *   const lastMessage = result[0];
   *   const setLastMessage = result[1];
   *
   * But written in a clean, compact way.
   *
   * 4) Why do we need a setter function?
   * ------------------------------------
   * React state is IMMUTABLE.
   * You cannot do:
   *   lastMessage = newValue ❌
   *
   * You MUST call the setter:
   *   setLastMessage(newValue) ✅
   *
   * This is how React knows it must re-render the UI.
   */
  const [lastMessage, setLastMessage] = useState<any>(null);

  /**
   * Another piece of state:
   *
   * - connected: current connection status
   * - setConnected: function to update that status
   *
   * Initial value is false because we are NOT connected
   * when the hook is first executed.
   */
  const [connected, setConnected] = useState(false);

  /**
   * useEffect — handling SIDE EFFECTS
   *
   * A "side effect" is anything that:
   * - talks to the outside world
   * - is not pure computation
   *
   * Examples:
   * - HTTP requests
   * - WebSocket connections
   * - Timers
   * - DOM manipulation
   *
   *
   * useEffect(() => { ... }, [])
   * --------------------------------
   * The empty dependency array [] means:
   *
   *   "Run this effect ONCE when the component mounts,
   *    and clean it up when the component unmounts."
   *
   * This perfectly matches WebSocket lifecycle needs.
   */
  useEffect(() => {

    /**
     * Open (or reuse) a WebSocket connection.
     *
     * This comes from our socket service.
     * The hook does not care HOW it connects,
     * only that it gets a WebSocket instance.
     */
    const socket = connectSocket();

    /**
     * onopen event
     *
     * Triggered when the WebSocket connection
     * is successfully established.
     */
    socket.onopen = () => {
      console.log('[WS] Connected');

      /**
       * Update React state.
       * This causes any component using this hook
       * to re-render and reflect the new status.
       */
      setConnected(true);
    };

    /**
     * onmessage event
     *
     * Triggered every time the server sends data.
     */
    socket.onmessage = (event) => {

      /**
       * WebSocket messages arrive as strings.
       * We parse them into JavaScript objects.
       */
      const data = JSON.parse(event.data);

      console.log('[WS] Message received:', data);

      /**
       * Save the latest message in state.
       * React will re-render components that depend on it.
       */
      setLastMessage(data);
    };

    /**
     * onclose event
     *
     * Triggered when the connection is closed
     * (either by client or server).
     */
    socket.onclose = () => {
      console.log('[WS] Disconnected');
      setConnected(false);
    };

    /**
     * onerror event
     *
     * Triggered on network or protocol errors.
     * We do not update state here, only log.
     */
    socket.onerror = (err) => {
      console.error('[WS] Error:', err);
    };

    /**
     * CLEANUP FUNCTION
     *
     * This function is executed when:
     * - The component using this hook unmounts
     * - OR before the effect runs again (not here, because [])
     *
     * This is CRUCIAL to avoid:
     * - memory leaks
     * - duplicated connections
     * - zombie event listeners
     */
    return () => {
      disconnectSocket();
    };

  }, []); // empty dependency array = run once

  /**
   * Hook return value
   *
   * We return an OBJECT so consumers can do:
   *
   * const { connected, lastMessage } = useWebSocket();
   *
   * This is more readable and flexible
   * than returning an array.
   */
  return {
    connected,
    lastMessage
  };
}
