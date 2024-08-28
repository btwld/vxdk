import '../plugins';

const getTestId = (id) => {
  return `[data-testid="${id}"]`;
};

describe('Vxdk UI Tests', () => {
  before(() => {
    cy.viewport('macbook-13');
    cy.visit('/');
  });

  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it('should render player', () => {
    cy.get('video').should('exist');
  });

  it('should play on start view', () => {
    cy.get(getTestId('start_view_play')).should('exist');

    cy.get(getTestId('start_view_play')).click();

    // check if video is playing after clicking play
    cy.get(getTestId('button_play')).should(
      'have.attr',
      'aria-label',
      'Pause (k)',
    );
  });

  it('should play and pause video on control bar button', () => {
    // Make sure we are inside the control bar
    cy.get(getTestId('control_bar')).within(() => {
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

  it('should play and pause on click video', () => {
    // pause video and make sure aria label is correct
    cy.get('video').click();
    cy.get(getTestId('button_play')).should(
      'have.attr',
      'aria-label',
      'Play (k)',
    );

    // play video and make sure aria label is correct
    cy.get('video').click();
    cy.get(getTestId('button_play')).should(
      'have.attr',
      'aria-label',
      'Pause (k)',
    );
  });

  it('should mute and unmute video on control bar volume button', () => {
    // Make sure we are inside the control bar
    cy.get(getTestId('control_bar')).within(() => {
      // mute video and make sure aria label is correct
      cy.get(getTestId('volume_button')).click();
      cy.get(getTestId('volume_button')).should(
        'have.attr',
        'aria-label',
        'Unmute (m)',
      );

      // unmute video and make sure aria label is correct
      cy.get(getTestId('volume_button')).click();
      cy.get(getTestId('volume_button')).should(
        'have.attr',
        'aria-label',
        'Mute (m)',
      );
    });
  });

  it('should open and close settings', () => {
    // Make sure we are inside the control bar
    cy.get(getTestId('control_bar')).within(() => {
      // open settings and make sure settings menu exists
      cy.get(getTestId('settings_button')).click();
      cy.get(getTestId('settings_menu')).should('exist');

      // close settings and make sure settings menu not exists
      cy.get(getTestId('settings_button')).click();
      cy.get(getTestId('settings_menu')).should('not.exist');
    });
  });

  it('should open and change speed on settings', () => {
    // Make sure we are inside the control bar
    cy.get(getTestId('control_bar')).within(() => {
      // open settings
      cy.get(getTestId('settings_button')).click();

      // open speed menu and change video speed to 2x
      cy.get(getTestId('settings_menu_speed')).click();
      cy.get(getTestId('submenu_option_label_5')).click();
      cy.get(`${getTestId('settings_menu_speed')} > div`).should(
        'have.text',
        '2',
      );

      // close settings
      cy.get(getTestId('settings_button')).click();
    });
  });

  it('should open and change quality on settings', () => {
    // Make sure we are inside the control bar
    cy.get(getTestId('control_bar')).within(() => {
      // open settings
      cy.get(getTestId('settings_button')).click();

      // open quality menu and change video quality to value not Auto
      cy.get(getTestId('settings_menu_quality')).click();
      cy.get(getTestId('submenu_option_label_0')).click();
      cy.get(`${getTestId('settings_menu_quality')} > div`).should(
        'not.include.text',
        'Auto',
      );

      // close settings
      cy.get(getTestId('settings_button')).click();
    });
  });
});
