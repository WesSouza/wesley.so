import React, { memo, useCallback, useEffect } from 'react';

import { Button, WindowMenu } from '~/src/components';
import { Icons } from '~/src/constants/Icons';
import { Colors, PaddingValues, Scale } from '~/src/constants/Styles';
import { modalOpen, windowClose, windowConfigure } from '~/src/state';
import { ApplicationWindowProps } from '~/src/system/ApplicationWindow';
import {
  Divider,
  Grid,
  HorizontalAlignments,
  HStack,
  Spacer,
  Text,
  Themes,
  VerticalAlignments,
  VStack,
} from '~/src/ui';

import { useCalculator } from './useCalculator';

function CalculatorComponent({ window }: ApplicationWindowProps) {
  const { id } = window;

  useEffect(() => {
    windowConfigure(id, {
      initialSize: { width: 345, height: 490 },
      icon: Icons.iconCalc,
      minimizable: true,
      resizable: false,
      title: 'Calculator',
    });
  }, [id]);

  const handleMenuSelect = useCallback(
    (action: string | null) => {
      switch (action) {
        case 'exit':
          windowClose(id);
          return;
      }

      modalOpen({
        actions: [['Ok', 'close']],
        content: "I'm still developing this, please try again next week.",
        icon: Icons.dialogWarning,
        title: 'Oh no',
      });
    },
    [id],
  );

  const {
    display,
    handleBackspace,
    handleClear,
    handleClearEntry,
    handleDot,
    handleMemoryAdd,
    handleMemoryClear,
    handleMemoryRead,
    handleMemorySet,
    handleNumber,
    handleOperation,
    handleResult,
    memoryDisplay,
  } = useCalculator();

  return (
    <>
      <WindowMenu
        menu={[
          [
            '&Edit',
            [
              ['&Copy', 'disabled', 'Ctrl+C'],
              ['&Paste', 'disabled', 'Ctrl+V'],
            ],
          ],
          [
            '&Help',
            [
              ['&Help Topics', 'disabled'],
              ['&About Calculator', 'disabled'],
            ],
          ],
        ]}
        onMenuSelect={handleMenuSelect}
      />
      <Divider />
      <VStack
        alignment={HorizontalAlignments.stretch}
        padding={PaddingValues.large}
        spacing={PaddingValues.large}
      >
        <VStack
          alignment={HorizontalAlignments.trailing}
          padding={Scale * 3}
          theme={Themes.frameInset}
        >
          <Text>{display}</Text>
        </VStack>
        <HStack alignment={VerticalAlignments.stretch}>
          <VStack
            alignment={HorizontalAlignments.stretch}
            spacing={PaddingValues.large}
            width={Scale * 25}
          >
            <VStack
              backgroundColor={Colors.gray}
              height={Scale * 20}
              padding={Scale * 3}
              theme={Themes.frameInset}
            >
              {memoryDisplay}
            </VStack>
            <Spacer />
            <Button
              foregroundColor={Colors.pureRed}
              height={Scale * 20}
              onPress={handleMemoryClear}
            >
              <Text bold>MC</Text>
            </Button>
            <Button
              foregroundColor={Colors.pureRed}
              height={Scale * 20}
              onPress={handleMemoryRead}
            >
              <Text bold>MR</Text>
            </Button>
            <Button
              foregroundColor={Colors.pureRed}
              height={Scale * 20}
              onPress={handleMemorySet}
            >
              <Text bold>MS</Text>
            </Button>
            <Button
              foregroundColor={Colors.pureRed}
              height={Scale * 20}
              onPress={handleMemoryAdd}
            >
              <Text bold>M+</Text>
            </Button>
          </VStack>
          <Spacer />
          <VStack
            alignment={HorizontalAlignments.trailing}
            spacing={PaddingValues.large}
          >
            <Grid columns={3} spacing={PaddingValues.large} width={Scale * 100}>
              <Button
                foregroundColor={Colors.pureRedDark}
                height={Scale * 20}
                onPress={handleBackspace}
              >
                <Text bold>Back</Text>
              </Button>
              <Button
                foregroundColor={Colors.pureRedDark}
                height={Scale * 20}
                onPress={handleClearEntry}
              >
                <Text bold>CE</Text>
              </Button>
              <Button
                foregroundColor={Colors.pureRedDark}
                height={Scale * 20}
                onPress={handleClear}
              >
                <Text bold>C</Text>
              </Button>
            </Grid>
            <Grid columns={4} spacing={PaddingValues.large} width={Scale * 120}>
              <Button foregroundColor={Colors.pureBlueDark} height={Scale * 20}>
                <Text bold>sqrt</Text>
              </Button>
              <Button
                foregroundColor={Colors.pureBlueDark}
                height={Scale * 20}
                onPress={handleOperation('%')}
              >
                <Text bold>%</Text>
              </Button>
              <Button
                foregroundColor={Colors.pureBlueDark}
                height={Scale * 20}
                onPress={handleOperation('1/x')}
              >
                <Text bold>1/x</Text>
              </Button>
              <Button
                foregroundColor={Colors.pureRed}
                height={Scale * 20}
                onPress={handleOperation('/')}
              >
                <Text bold>/</Text>
              </Button>
              <Button
                foregroundColor={Colors.pureBlue}
                height={Scale * 20}
                onPress={handleNumber(7)}
              >
                <Text bold>7</Text>
              </Button>
              <Button
                foregroundColor={Colors.pureBlue}
                height={Scale * 20}
                onPress={handleNumber(8)}
              >
                <Text bold>8</Text>
              </Button>
              <Button
                foregroundColor={Colors.pureBlue}
                height={Scale * 20}
                onPress={handleNumber(9)}
              >
                <Text bold>9</Text>
              </Button>
              <Button
                foregroundColor={Colors.pureRed}
                height={Scale * 20}
                onPress={handleOperation('*')}
              >
                <Text bold>*</Text>
              </Button>
              <Button
                foregroundColor={Colors.pureBlue}
                height={Scale * 20}
                onPress={handleNumber(4)}
              >
                <Text bold>4</Text>
              </Button>
              <Button
                foregroundColor={Colors.pureBlue}
                height={Scale * 20}
                onPress={handleNumber(5)}
              >
                <Text bold>5</Text>
              </Button>
              <Button
                foregroundColor={Colors.pureBlue}
                height={Scale * 20}
                onPress={handleNumber(6)}
              >
                <Text bold>6</Text>
              </Button>
              <Button
                foregroundColor={Colors.pureRed}
                height={Scale * 20}
                onPress={handleOperation('-')}
              >
                <Text bold>-</Text>
              </Button>
              <Button
                foregroundColor={Colors.pureBlue}
                height={Scale * 20}
                onPress={handleNumber(1)}
              >
                <Text bold>1</Text>
              </Button>
              <Button
                foregroundColor={Colors.pureBlue}
                height={Scale * 20}
                onPress={handleNumber(2)}
              >
                <Text bold>2</Text>
              </Button>
              <Button
                foregroundColor={Colors.pureBlue}
                height={Scale * 20}
                onPress={handleNumber(3)}
              >
                <Text bold>3</Text>
              </Button>
              <Button
                foregroundColor={Colors.pureRed}
                height={Scale * 20}
                onPress={handleOperation('+')}
              >
                <Text bold>+</Text>
              </Button>
              <Button
                foregroundColor={Colors.pureBlue}
                height={Scale * 20}
                onPress={handleNumber(0)}
              >
                <Text bold>0</Text>
              </Button>
              <Button
                foregroundColor={Colors.pureBlue}
                height={Scale * 20}
                onPress={handleOperation('+/-')}
              >
                <Text bold>+/-</Text>
              </Button>
              <Button
                foregroundColor={Colors.pureBlue}
                height={Scale * 20}
                onPress={handleDot}
              >
                <Text bold>.</Text>
              </Button>
              <Button
                foregroundColor={Colors.pureRed}
                height={Scale * 20}
                onPress={handleResult}
              >
                <Text bold>=</Text>
              </Button>
            </Grid>
          </VStack>
        </HStack>
      </VStack>
    </>
  );
}

export const Calculator = memo(CalculatorComponent);
