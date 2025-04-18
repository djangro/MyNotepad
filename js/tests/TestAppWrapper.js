import { queryClient, storage } from '@/App';
import { QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from '@/theme';
import '@/translations';
function TestAppWrapper({ children }) {
    return (<GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider storage={storage}>{children}</ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>);
}
export default TestAppWrapper;
