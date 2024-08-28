/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="cypress" />

const getTestId = (id) => {
  return `[data-testid="${id}"]`;
};

describe('Vxdk UI Mobile Tests', () => {
  before(() => {
    cy.viewport('samsung-s10');

    cy.visit('/', {
      onBeforeLoad: (win) => {
        win.ontouchstart = true;
        Object.defineProperty(win.navigator, 'userAgent', {
          value:
            'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Mobile Safari/537.36',
        });
      },
    });
  });

  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it('should render player', () => {
    cy.get('video').should('exist');
  });

  it('should render small control bar', () => {
    cy.get(getTestId('small_control_bar')).should('exist');
  });

  it('should play on start view', () => {
    cy.get(getTestId('start_view_play')).should('exist');
    cy.get(getTestId('start_view_play')).click();
    // Check if video is playing after clicking play
    cy.get(getTestId('button_play')).should(
      'have.attr',
      'aria-label',
      'Pause (k)',
    );
  });

  it('should play and pause video on control bar button', () => {
    // Show control bar
    cy.get(getTestId('root_container')).trigger('touchstart');

    // Make sure we are inside the control bar
    cy.get(getTestId('small_control_bar')).within(() => {
      // pause video and make sure aria label is correct

      cy.get(getTestId('button_play')).click();
      cy.get(getTestId('button_play')).should(
        'have.attr',
        'aria-label',
        'Play (k)',
      );

      // play video and make sure aria label is correct
      cy.get(getTestId('button_play')).click();
      cy.get(getTestId('button_play')).should(
        'have.attr',
        'aria-label',
        'Pause (k)',
      );
    });
  });

  it('should mute and unmute video on control bar volume button', () => {
    // Secure wait for disappearing small control bar
    cy.wait(2550);
    // Show control bar
    cy.get(getTestId('root_container')).trigger('touchstart');

    // Make sure we are inside the control bar
    cy.get(getTestId('small_control_bar')).within(() => {
      // Mute video and make sure aria label is correct
      cy.get(getTestId('volume_button')).click();
      cy.get(getTestId('volume_button')).should(
        'have.attr',
        'aria-label',
        'Unmute (m)',
      );
      // Unmute video and make sure aria label is correct
      cy.get(getTestId('volume_button')).click();
      cy.get(getTestId('volume_button')).should(
        'have.attr',
        'aria-label',
        'Mute (m)',
      );
    });
  });

  it('should open and close settings', () => {
    // Secure wait for disappearing small control bar
    cy.wait(2550);
    // Show control bar
    cy.get(getTestId('root_container')).trigger('touchstart');

    // Open settings and make sure settings menu exists
    cy.get(getTestId('settings_button')).click();
    cy.get(getTestId('settings_mobile')).should('exist');
    // Close settings and make sure settings menu not exists
    cy.get(getTestId('settings_mobile_button_ok')).click();
    cy.get(getTestId('settings_mobile')).should('not.exist');
  });

  it('should open and change speed on settings', () => {
    // Secure wait for disappearing small control bar
    cy.wait(2550);
    // Show control bar
    cy.get(getTestId('root_container')).trigger('touchstart');

    // Open settings
    cy.get(getTestId('settings_button')).click();
    // Change video speed to 2x
    cy.get(getTestId('select_speed')).select('2');
    cy.get(getTestId('select_speed')).should('have.value', '2');
    // Close settings
    cy.get(getTestId('settings_mobile_button_ok')).click();
  });

  it('should open and change quality on settings', () => {
    // Secure wait for disappearing small control bar
    cy.wait(2550);
    // Show control bar
    cy.get(getTestId('root_container')).trigger('touchstart');

    // Open settings
    cy.get(getTestId('settings_button')).click();
    // Change video quality to value not Auto
    cy.get(getTestId('select_quality')).select('0');
    cy.get(getTestId('select_quality')).should('have.value', '0');
    // Close settings
    cy.get(getTestId('settings_mobile_button_ok')).click();
  });
});
