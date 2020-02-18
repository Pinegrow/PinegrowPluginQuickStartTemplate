$(function () {
            $('body').one('pinegrow-ready', function (e, pinegrow) {

                        //Add a framework prefix - if you plan on having multiple versions, this should be the same for each version
                        let type_prefix = 'examplePlugin';
                        //Add a framework id, it should be unique to this framework and version
                        let framework_id = 'pge';
                        //Add a framework name
                        var framework = new PgFramework(framework_id, 'CHANGE_ME');

                        //Prevent the activation of multiple versions of the plugin - if this should be allowed, change to false
                        framework.type = type_prefix;
                        framework.allow_single_type = true;

                        //Optional, add a badge to the framework list notify user of new or updated status
                        //framework.info_badge = 'v1.0.0';

                        //Add a description of the plugin
                        framework.description = '';
                        //Add a framework  author to be displayed with the framework templates
                        framework.author = '';
                        //Add a website "https://pinegrow.com" or mailto "mailto:info@pinegrow.com" link for redirect on author name click
                        framework.author_link = '';

                        //Add a regex string for any CSS that shouldn't be user editable
                        framework.ignore_css_files = [/REGEX/];

                        // Tell Pinegrow about the framework
                        pinegrow.addFramework(framework);

                        var pge_article_box = new PgComponentType('article-box', 'Article Box', {
                            selector: '.pge-article-box',
                            tags: 'major',
                            code: '<article class="pge-article-box">\
            <h3 class="pge-article-title">Title</h3>\
            <p class="pge-article-meta">Written by <a href="#">Super User</a> on 12 April 2012. Posted in <a href="#">Blog</a></p>\
            <p class="pge-article-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>\
        </article>',
                            sections: {
                                pge_checkbox_options: {
                                    name: 'Article Options',
                                    default_open: true,
                                    fields: {
                                        pge_title_dropcap: {
                                            type: 'checkbox',
                                            name: 'Add dropcap to title?',
                                            action: 'apply_class',
                                            value: 'pge-dropcap'
                                        },
                                    }
                                },
                                pge_select_options: {
                                    name: 'Meta options',
                                    fefault_open: true,
                                    fields: {
                                        pge_meta_style: {
                                            type: 'select',
                                            name: 'Select meta style',
                                            action: 'apply_class',
                                            show_empty: true,
                                            option: [{
                                                    key: 'pge-meta-grey',
                                                    name: 'Greyed'
                                                },
                                                {
                                                    key: 'pge-meta-underlined',
                                                    name: 'Underlined'
                                                },
                                                {
                                                    key: 'pge-meta-highlight',
                                                    name: 'Author highlight'
                                                }
                                            ]
                                        },
                                    }
                                },
                                pge_file_options: {
                                    name: 'Article Picture Options',
                                    default_open: false,
                                    fields: {
                                        pge_picture_options: {
                                            type: 'image'
                                        }
                                    }
                                }
                            }
                        })
                    };
