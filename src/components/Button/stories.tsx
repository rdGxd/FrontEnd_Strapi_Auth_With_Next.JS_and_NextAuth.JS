import { Meta } from "@storybook/react";
import { VpnKey } from "@styled-icons/material-outlined/VpnKey";
import { Button, ButtonProps } from ".";

export default {
  title: "Button",
  component: Button,
  args: {
    children: "Button",
    disabled: false,
    icon: <VpnKey />,
  },
  decorators: [
    (Story) => {
      return (
        <div style={{ padding: "3.2rem" }}>
          <Story />
        </div>
      );
    },
  ],
  argTypes: {
    icon: {
      type: null,
    },
  },
} as Meta<typeof Button>;

export const Template = (args: ButtonProps) => {
  return (
    <>
      <Button {...args} />
    </>
  );
};
