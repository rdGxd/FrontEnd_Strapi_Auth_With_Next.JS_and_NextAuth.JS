import { Meta, StoryFn } from "@storybook/react";
import { FormLogin, FormLoginProps } from ".";

export default {
  title: "FormLogin",
  component: FormLogin,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => {
      return (
        <div style={{ padding: "4rem" }}>
          <Story />
        </div>
      );
    },
  ],
} as Meta<FormLoginProps>;

export const Template: StoryFn<FormLoginProps> = (args) => {
  return <FormLogin {...args} />;
};

export const WithError: StoryFn<FormLoginProps> = (args) => {
  return <FormLogin {...args} />;
};

WithError.args = {
  errorMessage: "Este é seu error",
};
