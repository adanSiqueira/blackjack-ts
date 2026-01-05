/**
 * Root component of the application.
 * For now, it only verifies that React is rendering correctly.
 */
function App() {
  return (
    <div style={styles.container}>
      <h1>Blackjack</h1>
      <p>React frontend is running.</p>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'sans-serif',
  },
};

export default App;