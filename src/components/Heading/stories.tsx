import { Meta, StoryFn } from '@storybook/react/';
import { Heading, HeadingProps } from '.';

export default {
  title: 'Heading',
  component: Heading,
  args: {
    children: 'O texto está escuro',
  },
  argTypes: {
    children: { type: 'string' },
  },
} as Meta<typeof Heading>;

export const Template: StoryFn<HeadingProps> = (args) => <Heading {...args} />;
